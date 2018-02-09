import React, { Component } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
let {  AppRegistry, FlatList, StyleSheet, Text, View, TouchableHighlight, TouchableWithoutFeedback, TextInput,Button } = require('react-native');


export default class CodeWordsHelper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redDataSource: [],
            blueDataSource: [],
            bystanderDataSource: [],
            assassinDataSource: []
        };
    }

    render() {
        return (

            <View style={ styles.currentBoard}>
                <Column title="Red" sectionHeaderStyle={styles.redSectionHeader} dataSource={this.state.redDataSource}/>
                <Column title="Blue" sectionHeaderStyle={styles.blueSectionHeader}  dataSource={this.state.blueDataSource}/>
                <Column title="Bystander" sectionHeaderStyle={styles.bystanderSectionHeader}  dataSource={this.state.bystanderDataSource}/>
                <Column title="Assassin" sectionHeaderStyle={styles.assassinSectionHeader}  dataSource={this.state.assassinDataSource}/>
            </View>

        );
    }
}

class Column extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addItem: '',
            dataSource: props.dataSource
        };
        this.addTask = this.addTask.bind(this);
    }


    addTask() {
        let notEmpty = this.state.addItem.trim().length > 0;

        if (notEmpty) {
            this.setState(
                prevState => {
                    let {dataSource, addItem} = prevState;
                    return {
                        dataSource: dataSource.concat({word: addItem}),
                        addItem: ""
                    };
                }
            );
        }
    };

    deleteTask = i => {
        this.setState(
            prevState => {
                let dataSource = prevState.dataSource.slice();

                dataSource.splice(i, 1);

                return { dataSource: dataSource };
            }
        );
    };


    changeTextHandler = text => {
        this.setState({addItem: text});
    };

    renderHeader() {
        return (
            <View>
                <Text style={this.props.sectionHeaderStyle}>{this.props.title}</Text>
            </View>
        );
    };

    renderItem = ({item, index}) => {
        return (
            <View style={styles.itemRow}>
                <Text style={styles.item}>{index+1}. {item.word}</Text>
                <TouchableWithoutFeedback  onPress={() => this.deleteTask(index)}>
                    <View style={styles.deleteButton}>
                        <Text style={styles.deleteButtonText}>X</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );

    };

    render() {
        return (
            <View style={styles.oneColumn}>

                <FlatList
                    data={this.state.dataSource}
                    renderItem={this.renderItem.bind(this)}
                    ListHeaderComponent={() => this.renderHeader()}
                    keyExtractor={item => item.word}
                />

                <TextInput
                    style={styles.textInput}
                    onChangeText={this.changeTextHandler}
                    onSubmitEditing={this.addTask}
                    value={this.state.addItem}
                />
            </View>
        );
    }
}


var styles = StyleSheet.create({
    currentBoard: {flex:1, flexDirection:'row',marginTop:40,marginLeft:10,marginRight:10,marginBottom:40},
    oneColumn: {flex:0.5, flexDirection:'column'},
    redSectionHeader: { fontWeight: 'bold', backgroundColor: 'red'},
    blueSectionHeader: { fontWeight: 'bold', backgroundColor: 'blue'},
    bystanderSectionHeader: { fontWeight: 'bold', backgroundColor: 'orange'},
    assassinSectionHeader: { fontWeight: 'bold', backgroundColor: 'green'},
    textInput: {height: 40, borderColor: 'gray', borderWidth: 1},
    itemRow: { flex:1, flexDirection:'row' },
    item: { width:'87%' },
    deleteButton: { width:20, backgroundColor: 'red', flex: 3, flexDirection:'column', justifyContent:'center', alignItems:'center',
        borderRadius: 5, borderWidth:1},
    deleteButtonText: { fontWeight: 'bold' },
    listview: {flex:0, borderWidth:1, borderColor:'green'},
    listviewContent: {borderWidth:1, borderColor:'red'},
    text: {fontSize:40, borderWidth:1, borderColor:'yellow'}
})



AppRegistry.registerComponent("CodeWordsHelper", () => CodeWordsHelper);