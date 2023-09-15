import { Input as In, IInputProps, FormControl, Text, HStack } from "native-base";

type Props = IInputProps & {
    errorMessage?: string | null;
    label?: string | null;
}

export function Input({ errorMessage = null, isInvalid, label, ...props }: Props) {
    const invalid = !!errorMessage || isInvalid;
    return (
        <FormControl flexDirection="column" isInvalid={invalid} mb={4}>

            <HStack>

            {label && (
            <FormControl.Label alignItems="center">  
            <Text color="green.100" fontSize={16} marginRight="3">
                {label}
            </Text>
            </FormControl.Label>
            )}
                
            <In 
                backgroundColor="gray.400"
                height={14}
                px={4}
                width="full"
                borderWidth={0}
                fontSize="md"
                color="white"
                placeholderTextColor="gray.400"
                isInvalid={invalid}
                _invalid={{
                    borderWidth: 1,
                    borderColor: "red.500"
                }}
                focusOutlineColor="green.500"
                _focus={{
                    bg: "gray.800",
                    borderWidth: 1, 
                }}
                { ...props }
            />
            </HStack>
            <FormControl.ErrorMessage>
                { errorMessage }
            </FormControl.ErrorMessage>
        </FormControl>
    );
}