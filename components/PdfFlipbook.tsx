import React, { useState, useEffect, useRef, forwardRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight, BookOpen, AlertCircle, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "./Button";
import { Skeleton } from "./Skeleton";
import styles from "./PdfFlipbook.module.css";

// Use the worker matching the installed version (3.11.174) to prevent runtime crashes.
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

interface PdfFlipbookProps {
  pdfUrl: string;
}

// react-pageflip requires child components to forward refs to DOM elements
const Page = forwardRef<HTMLDivElement, { imageUrl: string; number: number }>(
  ({ imageUrl, number }, ref) => {
    return (
      <div className={styles.pageContainer} ref={ref} data-density="soft">
        <img src={imageUrl} alt={`Page ${number}`} className={styles.pageImage} loading="lazy" width={400} height={550} decoding="async" />
        <div className={styles.pageNumber}>{number}</div>
      </div>
    );
  }
);
Page.displayName = "Page";

export const PdfFlipbook: React.FC<PdfFlipbookProps> = ({ pdfUrl }) => {
  const [pages, setPages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const flipBookRef = useRef<any>(null);
  const fetchLock = useRef(false);

  useEffect(() => {
    // Guard against React 18 strict mode double-fetching
    if (fetchLock.current) return;
    fetchLock.current = true;

    const renderPdf = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log(`Fetching PDF from: ${pdfUrl}`);
        
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;
        setTotalPages(numPages);
        
        const generatedImages: string[] = [];

        // Loop through each page, render to canvas, and save as image data URL
        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          // Scale 2.5 gives a good balance of crispness and memory usage for reading
          const viewport = page.getViewport({ scale: 2.5 });
          
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          
          if (!context) {
            throw new Error("Failed to get canvas 2d context");
          }

          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({ canvasContext: context, viewport }).promise;
          generatedImages.push(canvas.toDataURL("image/jpeg", 0.92));
          
          setProgress(Math.round((i / numPages) * 100));
          
          // Yield to main thread briefly to allow UI to paint the progress update
          await new Promise((resolve) => setTimeout(resolve, 10));
        }

        setPages(generatedImages);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to render PDF:", err);
        setError("We couldn't load the interactive viewer right now.");
        setIsLoading(false);
      }
    };

    renderPdf();
  }, [pdfUrl]);

  const nextButtonClick = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const prevButtonClick = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  const onPageChange = (e: { data: number }) => {
    setCurrentPage(e.data);
  };

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <AlertCircle size={48} className={styles.errorIcon} />
        <h3 className={styles.errorTitle}>Oops! Viewer Unavailable</h3>
        <p className={styles.errorText}>{error}</p>
        <p className={styles.errorText}>Please use the direct download button above to access your guide.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingIconWrapper}>
          <BookOpen size={40} className={styles.loadingIcon} />
        </div>
        <h3 className={styles.loadingTitle}>Preparing Your Guide</h3>
        <p className={styles.loadingSubtitle}>Optimizing pages for interactive reading...</p>
        
        <div className={styles.progressTrack}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className={styles.progressText}>{progress}% complete</p>

        <div className={styles.skeletonGrid}>
          <Skeleton className={styles.skeletonPage} />
          <Skeleton className={styles.skeletonPage} />
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.flipbookContainer} ${isFullscreen ? styles.fullscreen : ""}`}>
      {isFullscreen && (
        <Button 
          variant="ghost" 
          size="icon-lg"
          className={styles.closeFullscreenBtn} 
          onClick={() => setIsFullscreen(false)}
          aria-label="Close Fullscreen"
        >
          <Minimize2 size={24} />
        </Button>
      )}
      {/* HTMLFlipBook requires fixed dimensions or bounded stretch */}
      <HTMLFlipBook
        width={400}
        height={550}
        size="stretch"
        minWidth={300}
        maxWidth={isFullscreen ? 1600 : 500}
        minHeight={400}
        maxHeight={isFullscreen ? 1200 : 700}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        onFlip={onPageChange}
        className={styles.flipbook}
        ref={flipBookRef}
        style={{}}
        startPage={0}
        drawShadow={true}
        flippingTime={1000}
        usePortrait={true}
        startZIndex={0}
        autoSize={true}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={30}
        showPageCorners={true}
disableFlipByClick={false}
      >
        {pages.map((img, index) => (
          <Page key={index} imageUrl={img} number={index + 1} />
        ))}
      </HTMLFlipBook>

      <div className={styles.controls}>
        <Button 
          variant="secondary" 
          size="icon-md" 
          onClick={prevButtonClick}
          disabled={currentPage === 0}
          aria-label="Previous Page"
        >
          <ChevronLeft size={20} />
        </Button>
        
        <span className={styles.pageIndicator}>
          Page {currentPage + 1} of {totalPages}
        </span>
        
        <Button 
          variant="secondary" 
          size="icon-md" 
          onClick={nextButtonClick}
          disabled={currentPage >= totalPages - 1}
          aria-label="Next Page"
        >
          <ChevronRight size={20} />
        </Button>

        <div className={styles.controlsDivider} />

        <Button 
          variant="ghost" 
          size="icon-md" 
          onClick={() => setIsFullscreen(!isFullscreen)}
          aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          className={isFullscreen ? styles.fullscreenBtnActive : ""}
        >
          {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </Button>
      </div>
    </div>
  );
};