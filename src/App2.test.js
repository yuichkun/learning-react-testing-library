import axios from "axios";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { App2 } from "./App2";

jest.mock('axios');

describe('App2', () => {
    test('fetches stories from an API and displays them', async () => {
        const stories = [
            { objectId: '1', title: 'Hello' },
            { objectId: '2', title: 'React' },
        ];

        // axios.get.mockImplementationOnce(() =>
        //     Promise.resolve({ data: { hits: stories } })
        // )

        const promise = Promise.resolve({ data: { hits: stories } });
        axios.get.mockImplementationOnce(() => promise);

        render(<App2 />);

        await userEvent.click(screen.getByRole('button'));

        await act(() => promise);

        // const items = await screen.findAllByRole('listitem');

        expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });

    // test('fetches stories from an API and fails', async () => {
    //     axios.get.mockImplementationOnce(() =>
    //         Promise.reject(new Error())
    //     );

    //     render(<App2 />);

    //     await userEvent.click(screen.getByRole('button'));

    //     const message = await screen.findByText(/Something went wrong/);

    //     expect(message).toBeInTheDocument();
    // });
});

