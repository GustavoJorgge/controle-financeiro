import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";

export function NewTransactionModal() {
    return (
        <Dialog.DialogPortal>
            <Overlay />

            <Content>
                <Dialog.DialogTitle>Nova Transação</Dialog.DialogTitle>
                <Dialog.DialogClose>
                    <CloseButton>
                        <X size={24}/>
                    </CloseButton>
                </Dialog.DialogClose>
                <form action="">
                    <input type="text" placeholder="Descrição" required />
                    <input type="number" placeholder="Preço" required />
                    <input type="text" placeholder="Categoria" required />

                    <TransactionType>
                        <TransactionTypeButton variant ='income' value='income'>
                            <ArrowCircleUp size={24}/>
                            Entrada
                        </TransactionTypeButton>

                        <TransactionTypeButton variant ='outcome' value ='outcome'>
                            <ArrowCircleDown size={24}/>
                            Saida
                        </TransactionTypeButton>
                    </TransactionType>

                    <button type="submit">
                        Cadastrar
                    </button>
                </form>
            </Content>
        </Dialog.DialogPortal>
    )
}