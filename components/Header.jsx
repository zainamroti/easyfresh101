import React from 'react'
import { Flex, Text } from '@chakra-ui/react';

function Header() {
    return (
        <Flex justifyContent="center">
            <Text
                mt={5}
                fontSize='4xl'
                color={"blue.500"}
            > Welcome to <a href="https://easyfreshtech.com/"><i>EasyFresh101!</i></a>
            </Text>
        </Flex>
    )
}

export default Header
