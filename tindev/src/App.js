import React from 'react'
import { View } from 'react-native'
import { TextInput } from 'react-native-paper';
import styles from './styles'

class App extends React.Component {
    render() {
        let cpf;
        let rg;

        return (
            <View style={styles.container}>
                <TextInput
                    value={cpf}
                    onChangeText={text => cpf = text}
                    placeholder='000.000.000-00'
                />
                <TextInput
                    value={rg}
                    onChangeText={text => rg = text}
                    placeholder='00000-0'
                />
            </View>
        )
    }
}

// export default App;
export { App }