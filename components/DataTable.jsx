import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Tbody, Td, Th, Thead, Tr, chakra, Table, Flex, Text, HStack } from "@chakra-ui/react";
import React from "react";
import { useTable, useSortBy } from 'react-table'

function DataTable() {
    //Data in rows.
    const data = React.useMemo(
        () => [
            {
                serial: 1,
                product: 'Onion Type A',
                quantity: 5,
                unit: 'kg',
                unitPrice: 80,
                total: 400,
            },
            {
                serial: 2,
                product: 'Onion Type A',
                quantity: 25.4,
                unit: 'Dozen',
                unitPrice: 25.4,
                total: 25.4,
            },
            {
                serial: 2,
                product: 'Tomato',
                quantity: 25.4,
                unit: "kg",
                unitPrice: 25.4,
                total: 25.4,
            },
            {
                serial: 3,
                product: 'Patato',
                quantity: 25.4,
                unit: "pound",
                unitPrice: 25.4,
                total: 25.4,
            },

        ],
        [],
    )

    const columns = React.useMemo(
        () => [
            {
                Header: 'Serial #',
                accessor: 'serial',
                isNumeric: true,
            },
            {
                Header: 'Product Name',
                accessor: 'product',
            },
            {
                Header: 'Quantity',
                accessor: 'quantity',
                isNumeric: true,
            },
            {
                Header: 'Unit',
                accessor: 'unit',
            },
            {
                Header: 'Unit Price',
                accessor: 'unitPrice',
                isNumeric: true,
            },
            {
                Header: 'Total',
                accessor: 'total',
                isNumeric: true,
            },
        ],
        [],
    )

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data }, useSortBy)

    return (
        <Table mb={2} {...getTableProps()}>
            <Thead>
                {headerGroups.map((headerGroup, ind) => (
                    <Tr key={ind} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, ind) => (
                            <Th
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
                                    key={ind} {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
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