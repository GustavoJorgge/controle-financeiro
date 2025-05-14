import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import * as Dialog from "@radix-ui/react-dialog";
import logoImg from '../../assets/logo.svg'
import { NewTransactionModal } from "../NewTransactionModal";

<NewTransactionButton>Nova Transação</NewTransactionButton>
export function Header() {
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={logoImg} alt="" />
                <Dialog.Root>
                    <Dialog.DialogTrigger asChild>
                        <NewTransactionButton>Nova Transação</NewTransactionButton>
                    </Dialog.DialogTrigger>
                    <NewTransactionModal/>
                </Dialog.Root>
            </HeaderContent>
        </HeaderContainer>
    )
} 