import React from "react";

export interface State {
    isLoading: boolean
}

export class DaoListComponent extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    componentDidMount(): void {

    }

    render() {
        return <></>
    }
}
