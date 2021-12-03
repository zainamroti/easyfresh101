import { Box, Button, chakra, FormControl, FormLabel, GridItem, Heading, Input, Select, SimpleGrid, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import React, { useState } from 'react'
import Table from './Table';

function Form() {
    const [date, setDate] = useState(new Date());


    return (
        <Box mt={[10, 0]}>
            <chakra.form
                method="POST"
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
                        <FormControl as={GridItem} colSpan={[6, 3]}>
                            <FormLabel
                                htmlFor="Customer_name"
                                fontSize="sm"
                                fontWeight="md"
                                color={"gray.700"}
                            >
                                Customer Name
                            </FormLabel>
                            <Input
                                type="text"
                                name="Customer_name"
                                id="Customer_name"
                                autoComplete="given-name"
                                mt={1}
                                focusBorderColor="brand.400"
                                shadow="sm"
                                size="sm"
                                w="full"
                                rounded="md"
                            />
                        </FormControl>

                        <FormControl as={GridItem} colSpan={[6, 3]}>
                            <FormLabel
                                htmlFor="order_taker"
                                fontSize="sm"
                                fontWeight="md"
                                color={"gray.700"}
                            >
                                Order Taker
                            </FormLabel>
                            <Input
                                type="text"
                                name="order_taker"
                                id="order_taker"
                                autoComplete="taker-name"
                                mt={1}
                                focusBorderColor="brand.400"
                                shadow="sm"
                                size="sm"
                                w="full"
                                rounded="md"
                            />
                        </FormControl>

                        <FormControl as={GridItem} colSpan={6}>
                            <FormLabel
                                htmlFor="customer_address"
                                fontSize="sm"
                                fontWeight="md"
                                color={"gray.700"}
                            >
                                Customer Address
                            </FormLabel>
                            <Input
                                type="text"
                                name="customer_address"
                                id="customer_address"
                                autoComplete="customer_address"
                                mt={1}
                                focusBorderColor="brand.400"
                                shadow="sm"
                                size="sm"
                                w="full"
                                rounded="md"
                            />
                        </FormControl>

                        <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
                            <FormLabel
                                htmlFor="delivery-date"
                                fontSize="sm"
                                fontWeight="md"
                                color={"gray.700"}
                            >
                                Delivery Date
                            </FormLabel>
                            <SingleDatepicker
                                name="date-input"
                                date={date}
                                onDateChange={setDate}
                            />
                        </FormControl>



                    </SimpleGrid>
                </Stack>
                <Table />
                <Box
                    px={{ base: 4, sm: 6 }}
                    py={3}
                    bg={"gray.50"}
                    textAlign="right"
                >
                    <Button
                        type="submit"
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
                </Box>
            </chakra.form>
        </Box>
    )
}

export default Form
