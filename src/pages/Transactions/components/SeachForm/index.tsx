import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';

const searchFormSchema = z.object({
    query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {


    const {
        register,
        handleSubmit,
        formState: { isSubmitting } //isSubmitting retorna um true ou false dizendo se o formulario esta em estado de enviar informação ou não
    } = useForm<SearchFormInputs>({
        //Handle é uma forma padrão para identificarmos que o dado veio de uma ação do usuario
        resolver: zodResolver(searchFormSchema)
    })

    async function handleSearchTransactions(data: SearchFormInputs) {
        await new Promise(resolve => setTimeout(resolve,2000)) //bloqueamos o botão em tempo de resposta da api
        console.log(data)
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input
                type="text"
                placeholder="Busque a transação"
                {...register('query')}
            />
            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20} />
                Buscar
            </button>
        </SearchFormContainer>
    )
}