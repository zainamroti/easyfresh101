import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Tbody, Td, Th, Thead, Tr, chakra, Table, Flex, Text, HStack, Select } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useTable, useSortBy } from 'react-table'
import { productOptions } from '../lib/utils';

// Create an editable cell renderer
const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
}) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    const onChange = e => {
        setValue(e.target.value)
    }

    const onFocus = e => {
        // console.log("Focused::: ", e);
        if(value === 0) {

            setValue('')
        }
    }

    // We'll only update the external data when the input is blurred
    const onBlur = (e) => {
        updateMyData(index, id, value)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          console.log('do validate')
        updateMyData(index, id, value)
        event.target.blur()
        }
      }
    

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return <input value={value} onFocus={onFocus} onChange={onChange} onKeyDown={handleKeyDown} onBlur={onBlur} />
}

// Create a selectable cell renderer
const SelectableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
}) => {

    const onChange = e => {
        var val = e.target.value;
        // console.log("Selected::: ", val);
        updateMyData(index, id, val)

    }


    return <Select value={initialValue} onChange={onChange} >
        {productOptions.map((item, ind) => {
            return <option key={ind}>{item}</option>
        })
        }
    </Select>

}


// Set our editable cell renderer as the default Cell renderer
// const defaultColumn = {
//     Cell: EditableCell,
// }

function DataTable({ data, updateMyData, setTotalPrice }) {

    const columns = React.useMemo(
        () => [
            {
                Header: 'Serial #',
                accessor: 'serial',
                isNumeric: true,
                Cell: EditableCell,
                isEditable: true,
            },
            {
                Header: 'Product Name',
                accessor: 'productName',
                isEditable: false,
                Cell: SelectableCell

            },
            {
                Header: 'Quantity',
                accessor: 'quantity',
                isNumeric: true,
                Cell: EditableCell,
                isEditable: true,

            },
            {
                Header: 'Unit',
                accessor: 'unit',
                isEditable: false,


            },
            {
                Header: 'Unit Price',
                accessor: 'unitPrice',
                isNumeric: true,
                isEditable: false,


            },
            {
                Header: 'Total',
                accessor: 'total',
                isNumeric: true,
                isEditable: false,

            },
        ],
        [],
    )

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({
            columns, data,
            // updateMyData isn't part of the API, but
            // anything we put into these options will
            // automatically be available on the instance.
            // That way we can call this function from our
            // cell renderer!
            updateMyData,
        }, useSortBy)





    useEffect(() => {
        setTotalPrice(grandTotal(data))
    }, [data, setTotalPrice]);

    // Fixed reduce function which takes in an Array and returns sum of all total prices
    var grandTotal = function (arr) {
        return arr.reduce((sum, i) => {
            return sum + i.total
        }, 0)
    };





    return (
        <Table mb={2} {...getTableProps()}>
            <Thead>
                {headerGroups.map((headerGroup, ind) => (
                    <Tr key={ind} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, ind) => (
                            <Th
                                bgcolor={"green.900"}
                                border={'1px Solid grey'}
                                key={ind}
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                isNumeric={column.isNumeric}

                            >
                                {column.render('Header')}
                                <chakra.span pl='4'>
                                    {column.isSorted ? (
                                        column.isSortedDesc ? (
                                            <TriangleDownIcon aria-label='sorted descending' />
                                        ) : (
                                            <TriangleUpIcon aria-label='sorted ascending' />
                                        )
                                    ) : null}
                                </chakra.span>
                            </Th>
                        ))}
                    </Tr>
                ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
                {rows.map((row, ind) => {
                    prepareRow(row)
                    return (
                        <Tr key={ind} {...row.getRowProps()}>
                            {row.cells.map((cell, ind) => (

                                <Td border={'1px Solid #b8b8b8'}
                                    bgcolor={cell.column.isEditable && "white"}
                                    // bgcolor={ind === row.cells.length - 1 && "white"}
                                    key={ind} {...cell.getCellProps()} isNumeric={cell.column.isNumeric}

                                >

                                    {cell.render('Cell')}
                                </Td>
                            ))}
                        </Tr>
                    )
                })}

            </Tbody>

        </Table>
    )
}

export default DataTable