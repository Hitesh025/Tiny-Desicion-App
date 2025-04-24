import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import DecisionForm from './components/DecisionForm';
import DecisionList from './components/DecisionList';
import DecisionDetail from './components/DecisionDetail';
import EmptyState from './components/EmptyState';
import FiltersBar from './components/FiltersBar';
import SearchBar from './components/SearchBar';
import ConfirmDialog from './components/ConfirmDialog';

function App() {
  const [decisions, setDecisions] = useState(() => {
    const savedDecisions = localStorage.getItem('decisions');
    return savedDecisions ? JSON.parse(savedDecisions) : [];
  });

  const [currentView, setCurrentView] = useState('list');
  const [selectedDecision, setSelectedDecision] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    sort: 'newest',
    reflection: 'all'
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    decisionId: null,
    title: '',
    message: ''
  });

  const stats = {
    total: decisions.length,
    decided: decisions.filter(d => d.isDecided).length,
    thinking: decisions.filter(d => !d.isDecided).length,
    goodDecisions: decisions.filter(d => d.reflection === 'good').length,
    unsureDecisions: decisions.filter(d => d.reflection === 'unsure').length,
    badDecisions: decisions.filter(d => d.reflection === 'bad').length
  };

  useEffect(() => {
    localStorage.setItem('decisions', JSON.stringify(decisions));
  }, [decisions]);

  const addDecision = (newDecision) => {
    setDecisions([newDecision, ...decisions]);
    setCurrentView('list');
  };

  const updateDecision = (updatedDecision) => {
    setDecisions(
      decisions.map((decision) =>
        decision.id === updatedDecision.id ? updatedDecision : decision
      )
    );
    setSelectedDecision(updatedDecision);
    setCurrentView('detail');
  };

  const deleteDecision = (id) => {
    setDecisions(decisions.filter((decision) => decision.id !== id));
    setCurrentView('list');
    setConfirmDialog({ ...confirmDialog, isOpen: false });
  };

  const handleDeleteConfirmation = (id) => {
    setConfirmDialog({
      isOpen: true,
      decisionId: id,
      title: 'Delete Decision',
      message: 'Are you sure you want to delete this decision? This action cannot be undone.'
    });
  };

  const viewDecision = (decision) => {
    setSelectedDecision(decision);
    setCurrentView('detail');
  };

  const filteredDecisions = decisions.filter(decision => {
    if (searchQuery && !decision.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    if (filters.status === 'decided' && !decision.isDecided) {
      return false;
    }
    if (filters.status === 'thinking' && decision.isDecided) {
      return false;
    }

    if (filters.status === 'decided' && filters.reflection !== 'all') {
      if (filters.reflection === 'none' && decision.reflection) {
        return false;
      } else if (filters.reflection !== 'none' && decision.reflection !== filters.reflection) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    if (filters.sort === 'newest') {
      return new Date(b.dateCreated) - new Date(a.dateCreated);
    } else {
      return new Date(a.dateCreated) - new Date(b.dateCreated);
    }
  });

  return (
    <Layout
      setCurrentView={setCurrentView}
      stats={stats}
    >
      {currentView === 'form' && (
        <DecisionForm
          addDecision={addDecision}
          existingDecision={null}
          setCurrentView={setCurrentView}
        />
      )}

      {currentView === 'list' && (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Decisions</h2>

            {decisions.length > 0 && (
              <>
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
                <FiltersBar
                  filters={filters}
                  setFilters={setFilters}
                />
              </>
            )}

            {decisions.length === 0 ? (
              <EmptyState setCurrentView={setCurrentView} />
            ) : filteredDecisions.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-500">No decisions match your filters.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({
                      status: 'all',
                      sort: 'newest',
                      reflection: 'all'
                    });
                  }}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <DecisionList
                decisions={filteredDecisions}
                viewDecision={viewDecision}
                setCurrentView={setCurrentView}
              />
            )}
          </div>
        </>
      )}

      {currentView === 'detail' && selectedDecision && (
        <DecisionDetail
          decision={selectedDecision}
          updateDecision={updateDecision}
          deleteDecision={handleDeleteConfirmation}
          setCurrentView={setCurrentView}
        />
      )}

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={() => deleteDecision(confirmDialog.decisionId)}
        onCancel={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
      />
    </Layout>
  );
}

export default App;