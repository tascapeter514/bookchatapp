import WithAsync from "../components/HigherOrderComponents/WithAsync";
import { render, screen } from '@testing-library/react'



describe('with async testing suit', () => {

    const DummyComponent = ({children}: {children?: React.ReactNode}) => (
        <div>{children}</div>
    )

    const Wrapped = WithAsync(DummyComponent)

    test('error message string is rendered', () => {

        render(<Wrapped isLoading={false} isError={true} error='something went wrong' />)

        expect(screen.getByText('something went wrong')).toBeTruthy()
    })

    test('error message component is rendered', () => {



        render(<Wrapped isLoading={false} isError={true} error='something went wrong' />)

        expect(screen.queryByTestId('error-message')).toBeTruthy()


    })

})