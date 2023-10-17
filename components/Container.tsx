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
    FormControlLabelText, FormControlLabel, FormControl,
} from "@gluestack-ui/themed";
import Gradient from "../assets/Icons/Gradient";
import {useState} from "react";

const Container = () => {
    const glicerineDensity = 1.26
    const glycolDensity = 1.04

    const mililiteresOfGlycerinPerNicotineMiligram = 0.039
    const mililitersOfGlycolPerNicotineMiligram = 0.017

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
        setCalculatedGlycol(mililitersOfGlycolPerNicotineMiligram * (amountOfLiquid * wantedPower) + (amountOfAroma * 0.3))
        setCalculatedNicotine(amountOfLiquid * wantedPower / powerOfNicotine)

        setGlycerin(0.7 * amountOfLiquid - calculatedGlycerin)
        setGlycol(0.3 * amountOfLiquid - calculatedGlycol)
    };

    return (
        <Box paddingHorizontal="$10" flex={1} pt="$20" >
            <Box flex={2}>
                <FormControl
                    size="md"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                    isRequired={false}
                >
                    <FormControlLabel mb="$2">
                        <FormControlLabelText>Total amount of liquid [ml]</FormControlLabelText>
                    </FormControlLabel>
                    <Input mb="$5">
                        <InputField
                            onChangeText={(value) => setAmountOfLiquid(Number(value))}
                            placeholder="Total amount of liquid [ml]"
                        />
                    </Input>
                    <FormControlLabel mb="$2">
                        <FormControlLabelText>Power of nicotine [mg/ml]</FormControlLabelText>
                    </FormControlLabel>
                    <Input mb="$5">
                        <InputField
                            onChangeText={(value) => setPowerOfNicotine(Number(value))}
                            placeholder="Power of nicotine [mg/ml]"
                        />
                    </Input>
                    <FormControlLabel mb="$2">
                        <FormControlLabelText>Amount of aroma [ml]</FormControlLabelText>
                    </FormControlLabel>
                    <Input mb="$5">
                        <InputField
                            onChangeText={(value) => setAmountOfAroma(Number(value))}
                            placeholder="Amount of aroma [ml]"
                        />
                    </Input>
                    <FormControlLabel mb="$2">
                        <FormControlLabelText>Wanted power [mg/ml]</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                        <InputField
                            onChangeText={(value) => setWantedPower(Number(value))}
                            placeholder="Wanted power [mg/ml]"
                        />
                    </Input>
                </FormControl>

            </Box>
            <Box flex={1}>
                <Divider padding={1} marginVertical={20}/>

                <Text>Glycerin: {calculatedGlycerin.toFixed(2)} ml</Text>
                <Text>Glycol: {calculatedGlycol.toFixed(2)} ml</Text>
                <Text>Nicotine: {calculatedNicotine.toFixed(2)} ml</Text>

            </Box>

            <Box flex={2}>
                <Divider padding={1} marginVertical={20}/>

                <Text>Glycerin to put: {glycerin.toFixed(2)} ml ({(glycerin * glicerineDensity).toFixed(2)} g)</Text>
                <Text>Glycol to put: {glycol.toFixed(2)} ml ({(glycol * glycolDensity).toFixed(2)} g)</Text>


                <Button mt="$16" onPress={calculate}>
                    <ButtonText>Calculate</ButtonText>
                </Button>
            </Box>
        </Box>
    );
};

export default Container;