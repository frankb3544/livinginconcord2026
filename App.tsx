import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { GlobalContextProviders } from "./components/_globalContextProviders";
import Page_0 from "./pages/blog.tsx";
import PageLayout_0 from "./pages/blog.pageLayout.tsx";
import Page_1 from "./pages/about.tsx";
import PageLayout_1 from "./pages/about.pageLayout.tsx";
import Page_2 from "./pages/login.tsx";
import PageLayout_2 from "./pages/login.pageLayout.tsx";
import Page_3 from "./pages/_index.tsx";
import PageLayout_3 from "./pages/_index.pageLayout.tsx";
import Page_4 from "./pages/contact.tsx";
import PageLayout_4 from "./pages/contact.pageLayout.tsx";
import Page_5 from "./pages/thank-you.tsx";
import PageLayout_5 from "./pages/thank-you.pageLayout.tsx";
import Page_6 from "./pages/admin.blog.tsx";
import PageLayout_6 from "./pages/admin.blog.pageLayout.tsx";
import Page_7 from "./pages/admin.guide.tsx";
import PageLayout_7 from "./pages/admin.guide.pageLayout.tsx";
import Page_8 from "./pages/admin.leads.tsx";
import PageLayout_8 from "./pages/admin.leads.pageLayout.tsx";
import Page_9 from "./pages/neighborhoods.tsx";
import PageLayout_9 from "./pages/neighborhoods.pageLayout.tsx";
import Page_10 from "./pages/admin.blog.new.tsx";
import PageLayout_10 from "./pages/admin.blog.new.pageLayout.tsx";
import Page_11 from "./pages/admin.settings.tsx";
import PageLayout_11 from "./pages/admin.settings.pageLayout.tsx";
import Page_12 from "./pages/blog.$blogSlug.tsx";
import PageLayout_12 from "./pages/blog.$blogSlug.pageLayout.tsx";
import Page_13 from "./pages/market-reports.tsx";
import PageLayout_13 from "./pages/market-reports.pageLayout.tsx";
import Page_14 from "./pages/privacy-policy.tsx";
import PageLayout_14 from "./pages/privacy-policy.pageLayout.tsx";
import Page_15 from "./pages/admin.dashboard.tsx";
import PageLayout_15 from "./pages/admin.dashboard.pageLayout.tsx";
import Page_16 from "./pages/terms-of-service.tsx";
import PageLayout_16 from "./pages/terms-of-service.pageLayout.tsx";
import Page_17 from "./pages/admin.market-data.tsx";
import PageLayout_17 from "./pages/admin.market-data.pageLayout.tsx";
import Page_18 from "./pages/moving-to-concord.tsx";
import PageLayout_18 from "./pages/moving-to-concord.pageLayout.tsx";
import Page_19 from "./pages/resources-concord.tsx";
import PageLayout_19 from "./pages/resources-concord.pageLayout.tsx";
import Page_20 from "./pages/admin.testimonials.tsx";
import PageLayout_20 from "./pages/admin.testimonials.pageLayout.tsx";
import Page_21 from "./pages/admin.neighborhoods.tsx";
import PageLayout_21 from "./pages/admin.neighborhoods.pageLayout.tsx";
import Page_22 from "./pages/admin.blog.$postId.edit.tsx";
import PageLayout_22 from "./pages/admin.blog.$postId.edit.pageLayout.tsx";
import Page_23 from "./pages/market-reports.local-trends.tsx";
import PageLayout_23 from "./pages/market-reports.local-trends.pageLayout.tsx";
import Page_24 from "./pages/moving-to-concord.harrisburg.tsx";
import PageLayout_24 from "./pages/moving-to-concord.harrisburg.pageLayout.tsx";
import Page_25 from "./pages/moving-to-concord.kannapolis.tsx";
import PageLayout_25 from "./pages/moving-to-concord.kannapolis.pageLayout.tsx";
import Page_26 from "./pages/neighborhoods.28027-concord-nc.tsx";
import PageLayout_26 from "./pages/neighborhoods.28027-concord-nc.pageLayout.tsx";
import Page_27 from "./pages/moving-to-concord.schools-guide.tsx";
import PageLayout_27 from "./pages/moving-to-concord.schools-guide.pageLayout.tsx";
import Page_28 from "./pages/neighborhoods.$neighborhoodSlug.tsx";
import PageLayout_28 from "./pages/neighborhoods.$neighborhoodSlug.pageLayout.tsx";
import Page_29 from "./pages/moving-to-concord.cabarrus-county.tsx";
import PageLayout_29 from "./pages/moving-to-concord.cabarrus-county.pageLayout.tsx";
import Page_30 from "./pages/moving-to-concord.is-concord-nc-safe.tsx";
import PageLayout_30 from "./pages/moving-to-concord.is-concord-nc-safe.pageLayout.tsx";
import Page_31 from "./pages/moving-to-concord.cox-mill-high-school.tsx";
import PageLayout_31 from "./pages/moving-to-concord.cox-mill-high-school.pageLayout.tsx";
import Page_32 from "./pages/moving-to-concord.cost-of-living-concord-nc.tsx";
import PageLayout_32 from "./pages/moving-to-concord.cost-of-living-concord-nc.pageLayout.tsx";
import Page_33 from "./pages/moving-to-concord.moving-from-new-york-to-concord-nc.tsx";
import PageLayout_33 from "./pages/moving-to-concord.moving-from-new-york-to-concord-nc.pageLayout.tsx";
import Page_34 from "./pages/moving-to-concord.apartment-living.tsx";
import PageLayout_34 from "./pages/moving-to-concord.apartment-living.pageLayout.tsx";
import Page_35 from "./pages/moving-to-concord.buyers-faqs.tsx";
import PageLayout_35 from "./pages/moving-to-concord.buyers-faqs.pageLayout.tsx";
import Page_36 from "./pages/moving-to-concord.commuting.tsx";
import PageLayout_36 from "./pages/moving-to-concord.commuting.pageLayout.tsx";
import Page_37 from "./pages/moving-to-concord.concord-homes.tsx";
import PageLayout_37 from "./pages/moving-to-concord.concord-homes.pageLayout.tsx";
import Page_38 from "./pages/moving-to-concord.growing-families.tsx";
import PageLayout_38 from "./pages/moving-to-concord.growing-families.pageLayout.tsx";
import Page_39 from "./pages/moving-to-concord.home-financing.tsx";
import PageLayout_39 from "./pages/moving-to-concord.home-financing.pageLayout.tsx";
import Page_40 from "./pages/moving-to-concord.multigenerational.tsx";
import PageLayout_40 from "./pages/moving-to-concord.multigenerational.pageLayout.tsx";
import Page_41 from "./pages/moving-to-concord.pros-and-cons.tsx";
import PageLayout_41 from "./pages/moving-to-concord.pros-and-cons.pageLayout.tsx";
import Page_42 from "./pages/moving-to-concord.senior-communities.tsx";
import PageLayout_42 from "./pages/moving-to-concord.senior-communities.pageLayout.tsx";
import Page_43 from "./pages/cash-offers.tsx";
import PageLayout_43 from "./pages/cash-offers.pageLayout.tsx";
import Page_44 from "./pages/seller-resources.tsx";
import PageLayout_44 from "./pages/seller-resources.pageLayout.tsx";
import Page_45 from "./pages/relocation-help.tsx";
import PageLayout_45 from "./pages/relocation-help.pageLayout.tsx";
import Page_46 from "./pages/things-to-do.tsx";
import PageLayout_46 from "./pages/things-to-do.pageLayout.tsx";
import Page_47 from "./pages/downtown-concord.tsx";
import PageLayout_47 from "./pages/downtown-concord.pageLayout.tsx";
import Page_48 from "./pages/home-search.tsx";
import PageLayout_48 from "./pages/home-search.pageLayout.tsx";

if (!window.requestIdleCallback) {
  window.requestIdleCallback = (cb) => {
    setTimeout(cb, 1);
  };
}

import "./base.css";

const fileNameToRoute = new Map([["./pages/blog.tsx","/blog"],["./pages/about.tsx","/about"],["./pages/login.tsx","/login"],["./pages/_index.tsx","/"],["./pages/contact.tsx","/contact"],["./pages/thank-you.tsx","/thank-you"],["./pages/admin.blog.tsx","/admin/blog"],["./pages/admin.guide.tsx","/admin/guide"],["./pages/admin.leads.tsx","/admin/leads"],["./pages/neighborhoods.tsx","/neighborhoods"],["./pages/admin.blog.new.tsx","/admin/blog/new"],["./pages/admin.settings.tsx","/admin/settings"],["./pages/blog.$blogSlug.tsx","/blog/:blogSlug"],["./pages/market-reports.tsx","/market-reports"],["./pages/privacy-policy.tsx","/privacy-policy"],["./pages/admin.dashboard.tsx","/admin/dashboard"],["./pages/terms-of-service.tsx","/terms-of-service"],["./pages/admin.market-data.tsx","/admin/market-data"],["./pages/moving-to-concord.tsx","/moving-to-concord"],["./pages/resources-concord.tsx","/resources-concord"],["./pages/admin.testimonials.tsx","/admin/testimonials"],["./pages/admin.neighborhoods.tsx","/admin/neighborhoods"],["./pages/admin.blog.$postId.edit.tsx","/admin/blog/:postId/edit"],["./pages/market-reports.local-trends.tsx","/market-reports/local-trends"],["./pages/moving-to-concord.harrisburg.tsx","/moving-to-concord/harrisburg"],["./pages/moving-to-concord.kannapolis.tsx","/moving-to-concord/kannapolis"],["./pages/neighborhoods.28027-concord-nc.tsx","/neighborhoods/28027-concord-nc"],["./pages/moving-to-concord.schools-guide.tsx","/moving-to-concord/schools-guide"],["./pages/neighborhoods.$neighborhoodSlug.tsx","/neighborhoods/:neighborhoodSlug"],["./pages/moving-to-concord.cabarrus-county.tsx","/moving-to-concord/cabarrus-county"],["./pages/moving-to-concord.is-concord-nc-safe.tsx","/moving-to-concord/is-concord-nc-safe"],["./pages/moving-to-concord.cox-mill-high-school.tsx","/moving-to-concord/cox-mill-high-school"],["./pages/moving-to-concord.cost-of-living-concord-nc.tsx","/moving-to-concord/cost-of-living-concord-nc"],["./pages/moving-to-concord.moving-from-new-york-to-concord-nc.tsx","/moving-to-concord/moving-from-new-york-to-concord-nc"],["./pages/moving-to-concord.apartment-living.tsx","/moving-to-concord/apartment-living"],["./pages/moving-to-concord.buyers-faqs.tsx","/moving-to-concord/buyers-faqs"],["./pages/moving-to-concord.commuting.tsx","/moving-to-concord/commuting"],["./pages/moving-to-concord.concord-homes.tsx","/moving-to-concord/concord-homes"],["./pages/moving-to-concord.growing-families.tsx","/moving-to-concord/growing-families"],["./pages/moving-to-concord.home-financing.tsx","/moving-to-concord/home-financing"],["./pages/moving-to-concord.multigenerational.tsx","/moving-to-concord/multigenerational"],["./pages/moving-to-concord.pros-and-cons.tsx","/moving-to-concord/pros-and-cons"],["./pages/moving-to-concord.senior-communities.tsx","/moving-to-concord/senior-communities"],["./pages/cash-offers.tsx","/cash-offers"],["./pages/seller-resources.tsx","/seller-resources"],["./pages/relocation-help.tsx","/relocation-help"],["./pages/things-to-do.tsx","/things-to-do"],["./pages/downtown-concord.tsx","/downtown-concord"],["./pages/home-search.tsx","/home-search"]]);
const fileNameToComponent = new Map([
    ["./pages/blog.tsx", Page_0],
["./pages/about.tsx", Page_1],
["./pages/login.tsx", Page_2],
["./pages/_index.tsx", Page_3],
["./pages/contact.tsx", Page_4],
["./pages/thank-you.tsx", Page_5],
["./pages/admin.blog.tsx", Page_6],
["./pages/admin.guide.tsx", Page_7],
["./pages/admin.leads.tsx", Page_8],
["./pages/neighborhoods.tsx", Page_9],
["./pages/admin.blog.new.tsx", Page_10],
["./pages/admin.settings.tsx", Page_11],
["./pages/blog.$blogSlug.tsx", Page_12],
["./pages/market-reports.tsx", Page_13],
["./pages/privacy-policy.tsx", Page_14],
["./pages/admin.dashboard.tsx", Page_15],
["./pages/terms-of-service.tsx", Page_16],
["./pages/admin.market-data.tsx", Page_17],
["./pages/moving-to-concord.tsx", Page_18],
["./pages/resources-concord.tsx", Page_19],
["./pages/admin.testimonials.tsx", Page_20],
["./pages/admin.neighborhoods.tsx", Page_21],
["./pages/admin.blog.$postId.edit.tsx", Page_22],
["./pages/market-reports.local-trends.tsx", Page_23],
["./pages/moving-to-concord.harrisburg.tsx", Page_24],
["./pages/moving-to-concord.kannapolis.tsx", Page_25],
["./pages/neighborhoods.28027-concord-nc.tsx", Page_26],
["./pages/moving-to-concord.schools-guide.tsx", Page_27],
["./pages/neighborhoods.$neighborhoodSlug.tsx", Page_28],
["./pages/moving-to-concord.cabarrus-county.tsx", Page_29],
["./pages/moving-to-concord.is-concord-nc-safe.tsx", Page_30],
["./pages/moving-to-concord.cox-mill-high-school.tsx", Page_31],
["./pages/moving-to-concord.cost-of-living-concord-nc.tsx", Page_32],
["./pages/moving-to-concord.moving-from-new-york-to-concord-nc.tsx", Page_33],
["./pages/moving-to-concord.apartment-living.tsx", Page_34],
["./pages/moving-to-concord.buyers-faqs.tsx", Page_35],
["./pages/moving-to-concord.commuting.tsx", Page_36],
["./pages/moving-to-concord.concord-homes.tsx", Page_37],
["./pages/moving-to-concord.growing-families.tsx", Page_38],
["./pages/moving-to-concord.home-financing.tsx", Page_39],
["./pages/moving-to-concord.multigenerational.tsx", Page_40],
["./pages/moving-to-concord.pros-and-cons.tsx", Page_41],
["./pages/moving-to-concord.senior-communities.tsx", Page_42],
["./pages/cash-offers.tsx", Page_43],
["./pages/seller-resources.tsx", Page_44],
["./pages/relocation-help.tsx", Page_45],
["./pages/things-to-do.tsx", Page_46],
["./pages/downtown-concord.tsx", Page_47],
["./pages/home-search.tsx", Page_48],
  ]);

function makePageRoute(filename: string) {
  const Component = fileNameToComponent.get(filename);
  return <Component />;
}

function toElement({
  trie,
  fileNameToRoute,
  makePageRoute,
}: {
  trie: LayoutTrie;
  fileNameToRoute: Map<string, string>;
  makePageRoute: (filename: string) => React.ReactNode;
}) {
  return [
    ...trie.topLevel.map((filename) => (
      <Route
        key={fileNameToRoute.get(filename)}
        path={fileNameToRoute.get(filename)}
        element={makePageRoute(filename)}
      />
    )),
    ...Array.from(trie.trie.entries()).map(([Component, child], index) => (
      <Route
        key={index}
        element={
          <Component>
            <Outlet />
          </Component>
        }
      >
        {toElement({ trie: child, fileNameToRoute, makePageRoute })}
      </Route>
    )),
  ];
}

type LayoutTrieNode = Map<
  React.ComponentType<{ children: React.ReactNode }>,
  LayoutTrie
>;
type LayoutTrie = { topLevel: string[]; trie: LayoutTrieNode };
function buildLayoutTrie(layouts: {
  [fileName: string]: React.ComponentType<{ children: React.ReactNode }>[];
}): LayoutTrie {
  const result: LayoutTrie = { topLevel: [], trie: new Map() };
  Object.entries(layouts).forEach(([fileName, components]) => {
    let cur: LayoutTrie = result;
    for (const component of components) {
      if (!cur.trie.has(component)) {
        cur.trie.set(component, {
          topLevel: [],
          trie: new Map(),
        });
      }
      cur = cur.trie.get(component)!;
    }
    cur.topLevel.push(fileName);
  });
  return result;
}

function NotFound() {
  return (
    <div>
      <h1>Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>Go back to the <a href="/" style={{ color: 'blue' }}>home page</a>.</p>
    </div>
  );
}

import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollManager() {
  const { pathname, search, hash } = useLocation();
  const navType = useNavigationType(); // "PUSH" | "REPLACE" | "POP"

  useEffect(() => {
    // Back/forward: keep browser-like behavior
    if (navType === "POP") return;

    // Hash links: let the browser scroll to the anchor
    if (hash) return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, search, hash, navType]);

  return null;
}

export function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
      <ScrollManager />
      <GlobalContextProviders>
        <Routes>
          {toElement({ trie: buildLayoutTrie({
"./pages/blog.tsx": PageLayout_0,
"./pages/about.tsx": PageLayout_1,
"./pages/login.tsx": PageLayout_2,
"./pages/_index.tsx": PageLayout_3,
"./pages/contact.tsx": PageLayout_4,
"./pages/thank-you.tsx": PageLayout_5,
"./pages/admin.blog.tsx": PageLayout_6,
"./pages/admin.guide.tsx": PageLayout_7,
"./pages/admin.leads.tsx": PageLayout_8,
"./pages/neighborhoods.tsx": PageLayout_9,
"./pages/admin.blog.new.tsx": PageLayout_10,
"./pages/admin.settings.tsx": PageLayout_11,
"./pages/blog.$blogSlug.tsx": PageLayout_12,
"./pages/market-reports.tsx": PageLayout_13,
"./pages/privacy-policy.tsx": PageLayout_14,
"./pages/admin.dashboard.tsx": PageLayout_15,
"./pages/terms-of-service.tsx": PageLayout_16,
"./pages/admin.market-data.tsx": PageLayout_17,
"./pages/moving-to-concord.tsx": PageLayout_18,
"./pages/resources-concord.tsx": PageLayout_19,
"./pages/admin.testimonials.tsx": PageLayout_20,
"./pages/admin.neighborhoods.tsx": PageLayout_21,
"./pages/admin.blog.$postId.edit.tsx": PageLayout_22,
"./pages/market-reports.local-trends.tsx": PageLayout_23,
"./pages/moving-to-concord.harrisburg.tsx": PageLayout_24,
"./pages/moving-to-concord.kannapolis.tsx": PageLayout_25,
"./pages/neighborhoods.28027-concord-nc.tsx": PageLayout_26,
"./pages/moving-to-concord.schools-guide.tsx": PageLayout_27,
"./pages/neighborhoods.$neighborhoodSlug.tsx": PageLayout_28,
"./pages/moving-to-concord.cabarrus-county.tsx": PageLayout_29,
"./pages/moving-to-concord.is-concord-nc-safe.tsx": PageLayout_30,
"./pages/moving-to-concord.cox-mill-high-school.tsx": PageLayout_31,
"./pages/moving-to-concord.cost-of-living-concord-nc.tsx": PageLayout_32,
"./pages/moving-to-concord.moving-from-new-york-to-concord-nc.tsx": PageLayout_33,
"./pages/moving-to-concord.apartment-living.tsx": PageLayout_34,
"./pages/moving-to-concord.buyers-faqs.tsx": PageLayout_35,
"./pages/moving-to-concord.commuting.tsx": PageLayout_36,
"./pages/moving-to-concord.concord-homes.tsx": PageLayout_37,
"./pages/moving-to-concord.growing-families.tsx": PageLayout_38,
"./pages/moving-to-concord.home-financing.tsx": PageLayout_39,
"./pages/moving-to-concord.multigenerational.tsx": PageLayout_40,
"./pages/moving-to-concord.pros-and-cons.tsx": PageLayout_41,
"./pages/moving-to-concord.senior-communities.tsx": PageLayout_42,
"./pages/cash-offers.tsx": PageLayout_43,
"./pages/seller-resources.tsx": PageLayout_44,
"./pages/relocation-help.tsx": PageLayout_45,
"./pages/things-to-do.tsx": PageLayout_46,
"./pages/downtown-concord.tsx": PageLayout_47,
"./pages/home-search.tsx": PageLayout_48,
}), fileNameToRoute, makePageRoute })} 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </GlobalContextProviders>
    </BrowserRouter>
  );
}
