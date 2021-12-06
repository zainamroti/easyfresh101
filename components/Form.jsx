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
} from '@chakra-ui/react'
import { useForm, Controller } from 'react-hook-form'
import React, { useState, useEffect } from 'react'
import DataTable from './DataTable';
import { HStack } from '@chakra-ui/react';
import DatePicker from "react-date-picker/dist/entry.nostyle";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";



function Form() {
    const [totalPrice, setTotalPrice] = useState(0.0);

    //Data in rows.
    const rowData = React.useMemo(
        () => [
            {
                serial: 1,
                productName: 'Onion Type A',
                quantity: 5,
                unit: 'kg',
                unitPrice: 80,
                total: 400,
            },
            {
                serial: 2,
                productName: 'Banana',
                quantity: 7,
                unit: 'Dozen',
                unitPrice: 150,
                total: 50,
            },
            {
                serial: 2,
                productName: 'Tomato',
                quantity: 8,
                unit: "kg",
                unitPrice: 150,
                total: 75,
            },
            {
                serial: 3,
                productName: 'Eggs',
                quantity: 10,
                unit: "Dozen",
                unitPrice: 204,
                total: 125.4,
            },
            {
                serial: 3,
                productName: 'Patato',
                quantity: 10,
                unit: "kg",
                unitPrice: 70,
                total: 125.4,
            },

        ],
        [],
    )
    const [data, setData] = React.useState(rowData)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        handleSubmit,
        register,
        control,
        formState: { errors, isSubmitting },
    } = useForm()


    const formSubmit = (values, actions) => {
        console.log(`Form: Submit: ${values}`)

        return new Promise((resolve) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                resolve()
            }, 1000)
        })
    }

    // useEffect(() => {
    //    
    //   }, []);

    const onError = (errors, e) => console.log("OnERROR:", errors);



    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex, columnId and new value to update the
    // original data
    const updateMyData = (rowIndex, columnId, value) => {
        // // We also turn on the flag to not reset the page
        // setSkipPageReset(true)
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
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
                                        format={"dd-MM-yyyy"}
                                        placeholderText="Select a date"
                                        minDate={new Date()}
                                        maxDate={new Date(new Date().getTime() + (48 * 60 * 60 * 1000))}
                                        onChange={(date) => onChange(date)}
                                    />
                                    <FormErrorMessage>{error?.message}</FormErrorMessage>
                                </FormControl>

                            )}
                        />



                    </SimpleGrid>
                </Stack>


                {/* <Table /> */}
                <DataTable
                    data={data}
                    updateMyData={updateMyData}
                    setTotalPrice={setTotalPrice}
                />

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
                        // spinner={<BeatLoader size={8} color='white' />}
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
