import {
    Box, Button, chakra, FormControl, FormErrorMessage, FormLabel, GridItem, Heading, Input, Select, SimpleGrid, Stack, Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Spinner,
} from '@chakra-ui/react'
import { useForm, Controller } from 'react-hook-form'
import React, { useState, useEffect, useCallback } from 'react'
import DataTable from './DataTable';
import { HStack } from '@chakra-ui/react';
import DatePicker from "react-date-picker/dist/entry.nostyle";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { products, productOptions, fetcher, postData } from '../lib/utils';
import useSWR from 'swr';



// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
// export async function getServerSideProps() {
//     // Call an external API endpoint to get posts.
//     // You can use any data fetching library
//     const res = await fetch('/api/tableData')
//     const rowData = await res.json()


//     // By returning { props: { posts } }, the Bellow component
//     // will receive `Data` as a prop at build time
//     return {
//         props: {
//             rowData,
//         },
//     }
// }


function Form() {
    //getting data and error
    const { data, error } = useSWR('/api/tableData', fetcher)



    const [totalPrice, setTotalPrice] = useState(0.0);

    // console.log("Row Data: ", data);


    //Original Row data not changable
    const [rowData, setData] = React.useState([])
    // Row Order Items data that user updates and will be sent through form
    const [formData, setFormData] = React.useState([])

    //Data in rows.
    const mrData = React.useMemo(
        () => rowData,
        [rowData],
    )

    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        handleSubmit,
        register,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm()


    const formSubmit = async (values, actions) => {
        console.log(`Submiting Form: `, values);
        console.log(`Date format >> : `, values.deliveryDate.toDateString());
        var res = await postData("/api/orders", { ...values, deliveryDate: values.deliveryDate.toDateString(), ...formData, totalPrice })

        console.log(`Form Submited: `, res);
        resetData();
        return res;

        // return new Promise((resolve) => {

        //     setTimeout(() => {

        //         alert(JSON.stringify({ ...values, ...formData }, null, 2))
        //         resolve()
        //     }, 1000)
        // })
    }

    useEffect(() => {
        if (data) {
            setFormData(data['result'])
            setData(data['result'])
        }
    }, [data]);


    // const resetData = () => {
    //     setFormData(data['result']);
    //     reset({ "customerName": "", "orderTaker": "", "customerAddress": "", "delivery_date": "" });
    // }

    const resetData = useCallback(
        () => {
            if (!isSubmitting) {
                setFormData(rowData);
                reset({ "customerName": "", "orderTaker": "", "customerAddress": "", });
            }

        },
        [reset, rowData],
    );


    // useEffect(() => {
    //     if (data && !isSubmitting && totalPrice) {
    //         resetData();
    //     }
    // }, [isSubmitting]);



    if (!data && !error) {
        return <Box> <Spinner color='blue.500'
            size='lg' /> </Box>
    }
    if (data.status === 404) {
        return <Box> <Text> Sorry, Data not Found...! </Text> </Box>
    }

    const onError = (errors, e) => console.log("OnERROR:", errors);

    const calculateRowTotal = (val, unitPrice) => {
        return Math.round((val * unitPrice) * 100) / 100;
        // return (val * unitPrice).toFixed(2);
    }


    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex, columnId and new value to update the
    // original data
    const updateMyData = (rowIndex, columnId, value, valRow) => {
        // console.log("Updating data: ", rowIndex, columnId, value, valRow);
        setFormData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    if (columnId == 'name') {
                        // console.log("In Column data: ", formData, valRow, rowData);
                        return {
                            ...old[rowIndex],
                            [columnId]: value,
                            ['unit']: valRow.unit,
                            ['quantity']: "0",
                            ['price']: valRow.price,
                            ['total']: 0,
                        }
                    } else if (columnId == 'quantity') {
                        return {
                            ...old[rowIndex],
                            [columnId]: value,
                            ['total']: calculateRowTotal(parseFloat(value), row.price),
                        }
                    }
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    }
                }
                return row
            })
        )
    }


    return (
        <form  >
            <Box
                shadow="base"
                rounded={[null, "md"]}
                overflow={{ sm: "hidden" }}
            >
                <Stack
                    px={4}
                    py={5}
                    p={[null, 6]}
                    bg={"white"}
                    spacing={6}
                >
                    <SimpleGrid columns={6} spacing={6}>
                        <FormControl as={GridItem}
                            isInvalid={errors.customerName}
                            colSpan={[6, 3]}>
                            <FormLabel
                                htmlFor="customerName"
                                fontSize="sm"
                                fontWeight="md"
                                color={"gray.700"}
                            >
                                Customer Name
                            </FormLabel>

                            <Input
                                type="text"
                                name="customerName"
                                id="customerName"
                                autoComplete="customerName"
                                {...register('customerName', {
                                    required: 'This is required',
                                    minLength: { value: 4, message: 'Minimum length should be 4' },
                                })}
                                mt={1}
                                focusBorderColor="brand.400"
                                shadow="sm"
                                size="sm"
                                w="full"
                                rounded="md"
                            />
                            <FormErrorMessage>{errors.customerName && errors.customerName.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl
                            isInvalid={errors.orderTaker}
                            as={GridItem} colSpan={[6, 3]}>
                            <FormLabel
                                htmlFor="orderTaker"
                                fontSize="sm"
                                fontWeight="md"
                                color={"gray.700"}
                            >
                                Order Taker
                            </FormLabel>
                            <Input
                                type="text"
                                name="orderTaker"
                                id="orderTaker"
                                {...register('orderTaker', {
                                    required: 'This is required',
                                    minLength: { value: 4, message: 'Minimum length should be 4' },
                                })}
                                autoComplete="taker-name"
                                mt={1}
                                focusBorderColor="brand.400"
                                shadow="sm"
                                size="sm"
                                w="full"
                                rounded="md"
                            />
                            <FormErrorMessage>{errors.orderTaker && errors.orderTaker.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl
                            isInvalid={errors.customerAddress}

                            as={GridItem} colSpan={6}>
                            <FormLabel
                                htmlFor="customerAddress"
                                fontSize="sm"
                                fontWeight="md"
                                color={"gray.700"}
                            >
                                Customer Address
                            </FormLabel>
                            <Input
                                type="text"
                                {...register('customerAddress', {
                                    required: 'This is required',
                                    minLength: { value: 8, message: 'Minimum length should be 8' },
                                })}
                                name="customerAddress"
                                id="customerAddress"
                                autoComplete="customer_address"
                                mt={1}
                                focusBorderColor="brand.400"
                                shadow="sm"
                                size="sm"
                                w="full"
                                rounded="md"
                            />
                            <FormErrorMessage>{errors.customerAddress && errors.customerAddress.message}</FormErrorMessage>
                        </FormControl>

                        <Controller
                            control={control}
                            name='deliveryDate'

                            render={({
                                field: { onChange, onBlur, value, name, ref },
                                fieldState: { invalid, isTouched, isDirty, error }, formState, }) => (


                                <FormControl
                                    isInvalid={error?.message}
                                    as={GridItem} colSpan={[6, 6, null, 2]}>
                                    <FormLabel
                                        htmlFor="deliveryDate"
                                        fontSize="sm"
                                        fontWeight="md"
                                        color={"gray.700"}
                                    >
                                        Delivery Date
                                    </FormLabel>


                                    <DatePicker
                                        {...register('deliveryDate', {
                                            required: 'Date is required',
                                            valueAsDate: true,
                                        })}
                                        name="deliveryDate"
                                        value={value}
                                        // format={"yyyy-MM-dd"}
                                        format={"dd/MM/yyyy"}
                                        placeholderText="Select a date"
                                        minDate={new Date()}
                                        maxDate={new Date(new Date().getTime() + (48 * 60 * 60 * 1000))}
                                        onChange={(date) => {
                                            console.log('On Date Format: ', date?.toDateString());

                                            onChange(date)
                                        }}
                                    />
                                    <FormErrorMessage>{error?.message}</FormErrorMessage>
                                </FormControl>

                            )}
                        />



                    </SimpleGrid>
                </Stack>


                {/* <Table /> */}

                {data && <DataTable
                    data={formData}
                    rowData={mrData}
                    updateMyData={updateMyData}
                    setTotalPrice={setTotalPrice}
                />}

                {error && <FormErrorMessage>{error}</FormErrorMessage>}

                <HStack
                    mr={4}

                    justifyContent={
                        'flex-end'
                    } alignItems={
                        'flex-end'
                    }>
                    <Text
                        // mt={2}
                        mr={2}
                        fontSize='xl'
                        fontWeight={'Bold'}
                        color={"blue.500"}
                    > Total is: Rs.
                    </Text>
                    <Text
                        mt={2}
                        fontSize='xl'
                        fontWeight={'Bold'}
                        color={"blue.500"}
                    > {totalPrice}
                    </Text>
                </HStack>

                

                <Box
                    px={{ base: 4, sm: 6 }}
                    py={3}
                    bg={"gray.50"}
                    textAlign="right"
                >
                    
                    <Button
                        isLoading={isSubmitting}
                        onClick={onOpen}
                        color="blue.500"
                        bg={"gray.50"}
                        _focus={{ shadow: "" }}
                        variant='outline'
                        fontWeight="Bold"
                        colorScheme='teal'
                        size='lg'
                        height='45px'

                    >
                        Order
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Confirm Order</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Text
                                    mt={2}
                                    fontSize='lg'
                                    fontWeight={'Bold'}
                                    color={"blue.500"}
                                    noOfLines={5}
                                >
                                    Total price for the order is  <i >
                                        {`Rs. ${totalPrice}.`}
                                    </i>
                                </Text>

                                <Text
                                    mt={2}
                                    fontSize='sm'
                                    fontWeight={'Bold'}
                                    color={"grey.500"}
                                    noOfLines={5}
                                >
                                    {`Press 'Confirm' to order it or press 'Cancel' to return to the editing screen.`}
                                </Text>
                            </ModalBody>

                            <ModalFooter>
                                <Button variant='ghost' mr={3} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    type='submit'
                                    onClick={(event) => {
                                        // event.preventDefault();
                                        handleSubmit(formSubmit, onError)();
                                        onClose();
                                    }
                                    }
                                    colorScheme='blue' >Confirm</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>

                
            </Box>
        </form>
    )
}

export default Form
