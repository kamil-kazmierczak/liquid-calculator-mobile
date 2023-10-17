import {
    Text,
    Button,
    Box,
    Divider,
    Input,
    InputField,
    ScrollView,
    Heading,
    HStack,
    InputSlot,
    ButtonText,
} from "@gluestack-ui/themed";
import Gradient from "../assets/Icons/Gradient";
import { useState } from "react";

const Container = () => {
    const glicerineDensity = 1.26
    const glycolDensity = 1.04

    const mililiteresOfGlycerinPerNicotineMiligram = 0.039
    const mililitresOfGlycolPerNicotineMiligram = 0.017

    const [amountOfLiquid, setAmountOfLiquid] = useState(0.0);
    const [powerOfNicotine, setPowerOfNicotine] = useState(0.0);
    const [amountOfAroma, setAmountOfAroma] = useState(0.0);
    const [wantedPower, setWantedPower] = useState(0.0);

    const [calculatedGlycerin, setCalculatedGlycerin] = useState(0.0);
    const [calculatedGlycol, setCalculatedGlycol] = useState(0.0);
    const [calculatedNicotine, setCalculatedNicotine] = useState(0.0);

    const [glycerin, setGlycerin] = useState(0.0);
    const [glycol, setGlycol] = useState(0.0);

    const calculate = () => {
        setCalculatedGlycerin(mililiteresOfGlycerinPerNicotineMiligram * (amountOfLiquid * wantedPower) + (amountOfAroma * 0.7))
        setCalculatedGlycol(mililitresOfGlycolPerNicotineMiligram * (amountOfLiquid * wantedPower) + (amountOfAroma * 0.3))
        setCalculatedNicotine(amountOfLiquid * wantedPower / powerOfNicotine)

        setGlycerin(0.7 * amountOfLiquid - calculatedGlycerin)
        setGlycol(0.3 * amountOfLiquid - calculatedGlycol)
    };

    return (
        <Box margin="$16" justifyContent="flex-start" alignItems="flex-start">
            <Input>
                <InputField
                    onChangeText={(value) => setAmountOfLiquid(Number(value))}
                    placeholder="Total amount of liquid [ml]"
                />
            </Input>
            <Input>
                <InputField
                    onChangeText={(value) => setPowerOfNicotine(Number(value))}
                    placeholder="Power of nicotine [mg/ml]"
                />
            </Input>
            <Input>
                <InputField
                    onChangeText={(value) => setAmountOfAroma(Number(value))}
                    placeholder="Amount of aroma [ml]"
                />
            </Input>
            <Input>
                <InputField
                    onChangeText={(value) => setWantedPower(Number(value))}
                    placeholder="Wanted power [mg/ml]"
                />
            </Input>

            <Divider padding={1} marginVertical={20} />

            <Text>Glicerine: {calculatedGlycerin.toFixed(2)} ml</Text>
            <Text>Glycol: {calculatedGlycol.toFixed(2)} ml</Text>
            <Text>Nicotine: {calculatedNicotine.toFixed(2)} ml</Text>

            <Divider padding={1} marginVertical={20} />

            <Text>Glicerine to put: {glycerin.toFixed(2)} ml ({(glycerin * glicerineDensity).toFixed(2)} g)</Text>
            <Text>Glycol to put: {glycol.toFixed(2)} ml ({(glycol * glycolDensity).toFixed(2)} g)</Text>


            <Button marginTop={20} onPress={calculate}>
                <ButtonText>Calculate</ButtonText>
            </Button>
        </Box>
    );
};

export default Container;