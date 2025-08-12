import { createSlice } from "@reduxjs/toolkit";

// Previous code snippet imports the necessary functions from Redux Toolkit and defines a slice for managing transactions.
const initialState = {
    transactions: []
}

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        setTransactions: (state, actions) => {
            state.transactions = actions.payload
        },
        addTransaction: (state, actions) => {
            state.transactions.push(actions.payload)
        },
        resetTransaction: (state) => {
            state.transactions = []
        }
    }
})

const { reducer, actions } = transactionSlice

export const { setTransactions, addTransaction, resetTransaction } = actions
export default reducer