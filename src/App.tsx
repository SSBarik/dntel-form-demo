import React, { useEffect } from "react";
import { useDntelForm } from "react-dntel-form";
import sampleSchema from "../input.json";

const App: React.FC = () => {
  const {
    FormComponent,
    editMode,
    setEditMode,
    changes,
    saveChanges,
    reset,
    clearLS,
    activeSection,
    scrollToSection,
    expandAll,
    collapseAll,
  } = useDntelForm(sampleSchema);

  const handleSave = () => {
    saveChanges();
    setEditMode(false);
    console.log("Saved changes:", changes);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleScrollToFirstChangedSection = () => {
    const firstChangedSectionId = Object.keys(changes)[0];
    if (firstChangedSectionId) {
      scrollToSection(firstChangedSectionId);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("dntel-editMode");
    if (stored === "true") setEditMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("dntel-editMode", editMode.toString());
  }, [editMode]);

  return (
    <>
      <div className="flex justify-start p-4 w-full sticky top-0 bg-white z-10 border-b">
        <div className="max-w-xl w-full space-y-4">
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <h1 className="text-2xl font-bold">Dntel Form</h1>

            {!editMode ? (
              <button
                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => setEditMode(true)}
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  className={`px-4 py-1 text-white rounded transition ${
                    Object.keys(changes).length === 0
                      ? "bg-green-600 opacity-50 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                  onClick={handleSave}
                  disabled={Object.keys(changes).length === 0}
                >
                  Save
                </button>
                <button
                  className="px-4 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </>
            )}

            <button
              onClick={expandAll}
              className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700"
            >
              Collapse All
            </button>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={reset}
              disabled={Object.keys(changes).length === 0}
              className={`px-3 py-1 rounded text-white ${
                Object.keys(changes).length === 0
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              Reset
            </button>
            <button
              onClick={clearLS}
              className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
            >
              Clear LS
            </button>
            <button
              onClick={() => scrollToSection("InsuranceInformation")}
              className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Scroll to Section 2
            </button>
            <button
              onClick={handleScrollToFirstChangedSection}
              disabled={Object.keys(changes).length === 0}
              className="px-3 py-1 bg-indigo-600 text-white rounded disabled:opacity-50 hover:bg-indigo-700"
            >
              Go to First Changed
            </button>
          </div>

          <p className="text-sm text-muted-foreground">
            Active Section: <span className="font-mono">{activeSection}</span>
          </p>
        </div>
      </div>

      <div>
        <FormComponent />
      </div>

      <pre className="bg-gray-100 p-4 mt-4 rounded">
        {Object.keys(changes).length === 0
          ? "// No changes made yet"
          : JSON.stringify(changes, null, 2)}
      </pre>
    </>
  );
};

export default App;
