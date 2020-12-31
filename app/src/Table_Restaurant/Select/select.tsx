import React, { ChangeEvent } from 'react';

type SelectProps = {
    values: string[],
    func: Function,
    resetPage: Function
}

const Select = ({ values, func, resetPage }: SelectProps) => {
    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        func(e.currentTarget.value);
        resetPage(0);
    }

    return <select onChange={onChange} style={{marginRight: 10}}>
        <option>All</option>
        {
            values.map(value => <option key={value} value={value}>{value}</option>)
        }
    </select>
}

export default Select;