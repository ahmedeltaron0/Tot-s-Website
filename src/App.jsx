import { AnimatePresence } from "framer-motion";
import { useJourneyState } from "./hooks/useJourneyState";
import { pagesData } from "./data/pagesData";
import LandingPage from "./components/LandingPage";
import JourneyPage from "./components/JourneyPage";
import FinalRecapPage from "./components/FinalRecapPage";

function App() {
  const {
    hasClickedYes,
    currentPage,
    responses,
    submitted,
    clickYes,
    updateResponse,
    submitResponse,
    goNext,
    goPrev,
    restart,
  } = useJourneyState();

  const totalPages = pagesData.length + 1; // 6 journey + 1 final = 7

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {/* Landing Page */}
        {!hasClickedYes && currentPage === 0 && (
          <LandingPage key="landing" onYes={clickYes} />
        )}

        {/* Journey Pages 1-6 */}
        {hasClickedYes &&
          currentPage >= 1 &&
          currentPage <= pagesData.length && (
            <JourneyPage
              key={`page-${currentPage}`}
              pageData={pagesData[currentPage - 1]}
              pageIndex={currentPage}
              totalPages={totalPages}
              response={responses[pagesData[currentPage - 1].id]}
              isSubmitted={submitted[pagesData[currentPage - 1].id] || false}
              onUpdateResponse={(text) =>
                updateResponse(pagesData[currentPage - 1].id, text)
              }
              onSubmit={() => submitResponse(pagesData[currentPage - 1].id)}
              onNext={goNext}
              onBack={goPrev}
              canGoBack={currentPage > 0}
            />
          )}

        {/* Final Recap Page */}
        {hasClickedYes && currentPage === pagesData.length + 1 && (
          <FinalRecapPage
            key="final"
            responses={responses}
            onRestart={restart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
