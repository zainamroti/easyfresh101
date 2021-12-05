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
    const [date, setDate] = useState();
    const [totalPrice, setTotalPrice] = useState(0.0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        handleSubmit,
        register,
        control,
        watch,
        formState: { errors, isSubmitting },
    } = useForm()

    // const handleDatePicker = (newDate) => {
    //     console.log(`Picker: newDate: ${newDate}`)
    //     setDate(newDate)

    // }

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
    //     if(date) {
    //         unregister("deliveryDate")
    //     }
    //   }, [errors.deliveryDate, date, unregister]);

    const onError = (errors, e) => console.log("OnERROR:", errors);

    // console.log(`Erroors::: `, errors);

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
                                fieldState: { invalid, isTouched, isDirty, error }, formState,}) => (
                       
                       
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
                <DataTable />

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
                    > 1250
                    </Text>
                </HStack>

                <Box
                    px={{ base: 4, sm: 6 }}
                    py={3}
                    bg={"gray.50"}
                    textAlign="right"
                >
                    <Button
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
                                    fontSize='md'
                                    fontWeight={'Bold'}
                                    color={"blue.500"}
                                >
                                    {`Total price for the order is Rs. ${totalPrice}. \n Press 'Confirm' to order it or press 'Cancel' to return to the editing screen.`}
                                </Text>
                            </ModalBody>

                            <ModalFooter>
                                <Button variant='ghost' mr={3} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    type='submit'
                                    // isLoading={isSubmitting}
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
