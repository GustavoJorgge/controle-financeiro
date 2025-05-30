import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SeachForm";
import { PriceHightLight, TransactionsContainer, TransactionsTable } from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dataFormatter, priceFormatter } from "../../utils/formatter";
import { useContextSelector } from "use-context-selector";

export function Transactions() {
    const transactions = useContextSelector(TransactionsContext, (context) => { 
        return context.transactions
    });
   
    console.log(transactions)
    return (
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SearchForm />
                <TransactionsTable>
                    <tbody>
                        {transactions.map(transaction => {
                            return (
                                <tr key={transaction.id}>
                                    <td width="50%">{transaction.description}</td>
                                    <td>
                                        <PriceHightLight variant={transaction.type}>
                                            {transaction.type == 'outcome' && '- '}
                                        {priceFormatter.format(transaction.price)}
                                        </PriceHightLight>
                                    </td>
                                    <td>{transaction.category}</td>
                                    <td>{dataFormatter.format(new Date(transaction.createdAt))}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>

        </div>
    )
}