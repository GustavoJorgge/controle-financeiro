import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";


const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
    const {createTransaction} = useContext (TransactionsContext)

    const {
        control,
        register,
        handleSubmit,
        formState: { isSubmitting },
        reset,
    } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues: {
            type: 'income'
        }
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInputs) {     
        const {description, price, category, type} = data;
        
        await createTransaction({
            description,
            price,
            category,
            type,
        })
        reset();
    }

    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>Nova Transação</Dialog.Title>
                <Dialog.Close>
                    <CloseButton>
                        <X size={24} />
                    </CloseButton>
                </Dialog.Close>

                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input
                        type="text"
                        placeholder="Descrição"
                        required
                        {...register('description')} />
                    <input
                        type="number"
                        placeholder="Preço"
                        required
                        {...register('price', { valueAsNumber: true })} />
                    <input
                        type="text"
                        placeholder="Categoria"
                        required
                        {...register('category')} />

                    {/* // O componente <Controller> é fornecido pela biblioteca react-hook-form.
// Ele serve para integrar componentes de formulário customizados (não nativamente compatíveis com HTML form inputs)
// ao sistema de controle de formulários gerenciado pelo react-hook-form. */}
                    <Controller
                        control={control}     // A prop 'control' é passada para o Controller, permitindo que ele tenha acesso ao contexto do formulário.
                        name="type"
                        // A função render define como o campo será exibido visualmente no formulário.
                        // Ela recebe um objeto contendo várias propriedades úteis, como 'field', que contém as principais funções e valores do campo.
                        render={({ field }) => {
                            console.log(field)
                            return (
                                <TransactionType
                                    onValueChange={field.onChange} // Aqui, está vinculado à função onChange do campo controlado, mantendo o estado do formulário sincronizado.
                                    value={field.value}> 
                                    <TransactionTypeButton variant='income' value='income'>
                                        <ArrowCircleUp size={24} />
                                        Entrada
                                    </TransactionTypeButton>

                                    <TransactionTypeButton variant='outcome' value='outcome'>
                                        <ArrowCircleDown size={24} />
                                        Saida
                                    </TransactionTypeButton>
                                </TransactionType>
                            )
                        }}
                    />

                    <button type="submit" disabled={isSubmitting}>
                        Cadastrar
                    </button>
                </form>
            </Content>
        </Dialog.Portal>
    )
}