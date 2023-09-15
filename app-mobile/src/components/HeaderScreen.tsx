import { Center, Heading } from "native-base";

type Props = {
    title: string;
}

export function HeaderScreen({ title }: Props) {
    return (
        <Center backgroundColor="green.900" pb={6} pt={16}>
            <Heading color="gray.100" fontSize="xl">
                { title }
            </Heading>
        </Center>
    );
}