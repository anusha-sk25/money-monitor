import React from 'react'

import { Button, Stack } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import BudgetCard from "./components/BudgetCard"
import TotalBudgetCard from './components/TotalBudgetCard'
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard'
import AddBudgetModal from './components/AddBudgetModal'
import AddExpenseModal from './components/AddExpenseModal'
import ViewExpensesModal from './components/ViewExpensesModal'
import ThemeSwitcher from './components/ThemeSwitcher'
import { useState } from 'react'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetsContexts'



function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Money Monitor</h1>
          <Button variant="primary" gap="2" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
        </Stack>
        <div style={{
          
          display: "grid",
          
          gridTemplateColumns: "repeat{auto-fill,minmax(300px,1fr))",
          gap: "1rem",
          alignItems: "flex-start",
        }}
        >

          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}

              />)


          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={() =>
              setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
            }

          />
          
          
          <TotalBudgetCard />
          <ThemeSwitcher />
          
        </div>
        
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)} />

      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        //default written..which shows the default variable at the text box
        handleClose={() => setShowAddExpenseModal(false)}
      />

      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}

        handleClose={() => setViewExpensesModalBudgetId()}
      />

    </>
  )

}

export default App