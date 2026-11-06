import { SITE_CONTACT_EMAIL, SITE_CONTACT_EMAIL_MAILTO } from "./siteContact";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

// Initialize pdfmake fonts
(pdfMake as any).addVirtualFileSystem(pdfFonts);

export function generateRelocationPdf() {
  const docDefinition: any = {
    content: [
      { text: "Moving to Concord, NC", style: "header" },
      { text: "Your Complete Relocation Guide", style: "subheader" },
      { text: "Prepared by Franklin Bellamy | Lifestyle International Realty / Unlocking Real Estate", style: "contactInfo" },
      { text: "\n\n" },
      
      { text: "1. Welcome to Concord NC", style: "sectionHeader" },
      { text: "Welcome to Concord, North Carolina! Situated just 20 miles northeast of Charlotte, Concord perfectly balances historic charm with rapid modern growth. Known as a premier location for families and professionals alike, Concord offers a robust economy, excellent schools, and diverse entertainment options. Whether you are drawn by the booming job market of the Charlotte metro area or the appeal of suburban tranquility, Concord provides an unmatched quality of life." },
      { text: "\n" },
      
      { text: "2. Cost of Living", style: "sectionHeader" },
      { text: "One of the major draws of Concord is its affordable cost of living compared to national averages and the neighboring city of Charlotte. Housing costs here offer excellent value, allowing families to purchase larger homes in master-planned communities for less than they would pay in Charlotte proper. Utilities, groceries, and transportation costs also remain competitive." },
      { text: "\n" },
      
      { text: "3. Best Neighborhoods", style: "sectionHeader" },
      { text: "Concord boasts a variety of neighborhoods to suit every lifestyle. Afton Village offers a highly walkable, new-urbanism feel with shops and dining. Christenbury is renowned for its luxury homes and resort-style amenities. Historic Downtown Concord provides beautiful historic homes wrapped in Southern charm. Highland Creek spans both Concord and Charlotte, featuring world-class golf and recreation." },
      { text: "\n" },
      
      { text: "4. Schools & Education", style: "sectionHeader" },
      { text: "Families moving to Concord often prioritize the highly-rated Cabarrus County Schools system. Schools like Cox Mill High School are frequently recognized for academic excellence and outstanding athletic programs. Additionally, the area offers prominent private school options and is close to higher education institutions like Rowan-Cabarrus Community College and UNC Charlotte." },
      { text: "\n" },

      { text: "5. Employment & Economy", style: "sectionHeader" },
      { text: "Concord's economy is diverse and thriving. While it historically relied on textiles, today's local economy is driven by healthcare, manufacturing, retail, and motorsports. Atrium Health Cabarrus is the largest employer in the county, providing thousands of high-paying medical and administrative jobs." },
      { text: "\n" },

      { text: "6. Things to Do", style: "sectionHeader" },
      { text: "Entertainment in Concord is world-class. The city is globally recognized as the heart of NASCAR, home to the Charlotte Motor Speedway. Shopping enthusiasts flock to Concord Mills, a massive outlet mall featuring over 200 stores. Downtown Concord provides a more relaxed vibe with local breweries, antique shops, and the historic Gem Theatre." },
      { text: "\n" },

      { text: "7. Healthcare", style: "sectionHeader" },
      { text: "Residents of Concord have access to premier medical care right in their backyard. Atrium Health Cabarrus is a regional medical center offering advanced cardiovascular care, a comprehensive cancer center, and emergency services." },
      { text: "\n" },

      { text: "8. Transportation", style: "sectionHeader" },
      { text: "Getting around and traveling out of Concord is highly convenient. The city is bisected by Interstate 85, providing a direct, fast route into downtown Charlotte. For air travel, Concord boasts its own regional airport, Concord-Padgett Regional Airport, and Charlotte Douglas International Airport (CLT) is only about a 30-40 minute drive away." },
      { text: "\n" },

      { text: "9. Weather & Climate", style: "sectionHeader" },
      { text: "Concord enjoys a temperate climate with four distinct seasons. Winters are generally mild, with average high temperatures in the 50s and rare, light snowfalls that melt quickly. Summers are classically Southern—hot and humid, with highs often in the 90s. Spring and autumn offer stunning foliage and comfortable weather." },
      { text: "\n" },

      { text: "10. Tips for Your Move", style: "sectionHeader" },
      { text: "When planning your move to Concord, start by connecting with a local real estate expert who understands the nuances of the different neighborhoods. Remember to account for North Carolina's vehicle registration process. Set up your utilities early, as providers may need a few days' notice to start service." },
      { text: "\n" },

      { text: `For more assistance, contact Franklin Bellamy at (704) 904-5142 or ${SITE_CONTACT_EMAIL}`, style: "footerText" }
    ],
    styles: {
      header: { fontSize: 24, bold: true, color: "#1A2845", margin: [0, 0, 0, 5] },
      subheader: { fontSize: 16, bold: true, color: "#4daf6e", margin: [0, 0, 0, 10] },
      contactInfo: { fontSize: 12, italics: true, color: "#6B7280" },
      sectionHeader: { fontSize: 16, bold: true, color: "#1A2845", margin: [0, 15, 0, 5] },
      footerText: { fontSize: 10, italics: true, color: "#6B7280", margin: [0, 30, 0, 0] }
    },
    defaultStyle: {
      fontSize: 11,
      lineHeight: 1.5
    }
  };

  pdfMake.createPdf(docDefinition).download("Concord_Relocation_Guide.pdf");
}