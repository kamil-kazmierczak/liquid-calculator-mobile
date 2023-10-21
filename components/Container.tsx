import {
    Text,
    Button,
    Box,
    Divider,
    Input,
    InputField,
    ButtonText,
    FormControlLabelText, FormControlLabel, FormControl,
} from "@gluestack-ui/themed";
import {useState} from "react";

const Container = () => {
    const glycerinDensity = 1.26
    const glycolDensity = 1.04

    const millilitersOfGlycerinPerNicotineMilligram = 0.039
    const millilitersOfGlycolPerNicotineMilligram = 0.017

    const initialCalculations = {
        amountOfLiquid: 0.0,
        powerOfNicotine: 0.0,
        amountOfAroma: 0.0,
        wantedPower: 0.0,
        glycerinFromNicotine: 0.0,
        glycolFromNicotine: 0.0,
        nicotine: 0.0,
        glycerin: 0.0,
        glycol: 0.0,
    }

    const [calc, setCalc] = useState(initialCalculations);


    const calculate = () => {
        setCalc(prevState => ({
            ...prevState,
            glycerinFromNicotine: millilitersOfGlycerinPerNicotineMilligram * (prevState.amountOfLiquid * prevState.wantedPower),
            glycolFromNicotine: millilitersOfGlycolPerNicotineMilligram * (prevState.amountOfLiquid * prevState.wantedPower),
            nicotine: prevState.amountOfLiquid * prevState.wantedPower / prevState.powerOfNicotine,
        }))
        setCalc(prevState => ({
            ...prevState,
            glycerin: 0.7 * prevState.amountOfLiquid - prevState.glycerinFromNicotine - (prevState.amountOfAroma * 0.7),
            glycol: 0.3 * prevState.amountOfLiquid - prevState.glycolFromNicotine - (prevState.amountOfAroma * 0.3),
        }))


    };

    return (
        <Box paddingHorizontal="$10" flex={1} pt="$20" >
            <Box flex={3}>
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
                    <Input mb="$5"
                           variant="rounded">
                        <InputField
                            keyboardType="numeric"
                            onChangeText={(value) => setCalc(prev => ({...prev, amountOfLiquid: Number(value)}))}
                            placeholder="Total amount of liquid [ml]"
                        />
                    </Input>
                    <FormControlLabel mb="$2">
                        <FormControlLabelText>Power of nicotine [mg/ml]</FormControlLabelText>
                    </FormControlLabel>
                    <Input mb="$5"
                           variant="underlined">
                        <InputField
                            keyboardType="numeric"
                            onChangeText={(value) => setCalc(prev => ({...prev, powerOfNicotine: Number(value)}))}
                            placeholder="Power of nicotine [mg/ml]"
                        />
                    </Input>
                    <FormControlLabel mb="$2">
                        <FormControlLabelText>Amount of aroma [ml]</FormControlLabelText>
                    </FormControlLabel>
                    <Input mb="$5">
                        <InputField
                            keyboardType="numeric"
                            onChangeText={(value) => setCalc(prev => ({...prev, amountOfAroma: Number(value)}))}
                            placeholder="Amount of aroma [ml]"
                        />
                    </Input>
                    <FormControlLabel mb="$2">
                        <FormControlLabelText>Wanted power [mg/ml]</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                        <InputField
                            keyboardType="numbers-and-punctuation"
                            onChangeText={(value) => setCalc(prev => ({...prev, wantedPower: Number(value)}))}
                            placeholder="Wanted power [mg/ml]"
                        />
                    </Input>
                </FormControl>

            </Box>
            <Box flex={1}>
                <Divider padding={1} marginVertical={20}/>

                <Text>Glycerin from nicotine: {(calc.glycerinFromNicotine).toFixed(2)} ml</Text>
                <Text>Glycol from nicotine: {(calc.glycolFromNicotine).toFixed(2)} ml</Text>
                <Text>Glycerin from aroma: {(0.7 * calc.amountOfAroma).toFixed(2)} ml</Text>
                <Text>Glycol from aroma: {(0.3 * calc.amountOfAroma).toFixed(2)} ml</Text>
            </Box>

            <Box flex={2}>
                <Divider padding={1} marginVertical={20}/>

                <Text>Nicotine: {calc.nicotine.toFixed(2)} ml ({(calc.glycerinFromNicotine * glycerinDensity + calc.glycolFromNicotine * glycolDensity).toFixed(2)} g)</Text>
                <Text>Glycerin: {calc.glycerin.toFixed(2)} ml ({(calc.glycerin * glycerinDensity).toFixed(2)} g)</Text>
                <Text>Glycol: {calc.glycol.toFixed(2)} ml ({(calc.glycol * glycolDensity).toFixed(2)} g)</Text>

                <Button mt="$16" onPress={calculate}>
                    <ButtonText>Calculate</ButtonText>
                </Button>
            </Box>
        </Box>
    );
};

export default Container;