import { useContext } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";

export function useSummary(){
    const { transactions } = useContext(TransactionsContext);

    // { income = total de entrada ; outcome = total de saidas ; total = entrada-saidas}
    const summary = transactions.reduce(
        (acc, transaction) => {
            if (transaction.type == 'income') {
                acc.income += transaction.price;
                acc.total += transaction.price;
            } else {
                acc.outcome += transaction.price;
                acc.total -= transaction.price;
            }

            return acc;
        },
        {
            income: 0,
            outcome: 0,
            total: 0
        }
    )

    return summary;
}