import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const HomeScreen = ({ navigation }: { navigation: any }) => {
    const [menuItems, setMenuItems] = useState([
        { id: '1', name: 'Caprese Salad', description: 'Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze.', price: '60.00', course: 'Appetizer' },
        { id: '2', name: 'Filet Mignon', description: 'Tender steak cooked to perfection with a red wine reduction.', price: '150.00', course: 'Main Course' },
        { id: '3', name: 'Lemon Tart', description: 'Zesty lemon curd in a crisp pastry shell.', price: '70.00', course: 'Dessert' },
        { id: '4', name: 'Greek Salad', description: 'Crisp lettuce, feta, olives, and cucumbers with a lemon vinaigrette.', price: '80.00', course: 'Salad' },
        { id: '5', name: 'Seafood Paella', description: 'Traditional Spanish rice dish with shrimp, clams, and mussels.', price: '95.00', course: 'Main Course' },
        { id: '6', name: 'Champagne', description: 'A glass of bubbly champagne.', price: '120.00', course: 'Beverage' },
        { id: '7', name: 'Stuffed Mushrooms', description: 'Mushrooms filled with cream cheese and herbs, baked until golden.', price: '50.00', course: 'Appetizer' },
        { id: '8', name: 'Spaghetti Carbonara', description: 'Classic Italian pasta with eggs, cheese, pancetta, and pepper.', price: '65.00', course: 'Main Course' },
        { id: '9', name: 'Crème Brûlée', description: 'Vanilla custard topped with a caramelized sugar crust.', price: '85.00', course: 'Dessert' },
        { id: '10', name: 'Espresso', description: 'Rich and bold Italian-style coffee.', price: '35.00', course: 'Beverage' },
    ]);

    const [showAddMenuItem, setShowAddMenuItem] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [course, setCourse] = useState('Starters');

    const totalMenuItems = menuItems.length;

    const removeMenuItem = (id: string) => {
        setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const addMenuItem = (newItem: { id: string; name: string; description: string; price: string; course: string }) => {
        setMenuItems((prevItems) => [...prevItems, newItem]);
    };

    const handleAddItem = () => {
        if (!name || !description || !price || isNaN(Number(price))) {
            alert('Please fill in all fields with valid data.');
            return;
        }

        const newItem = {
            id: (menuItems.length + 1).toString(),
            name,
            description,
            price,
            course,
        };

        addMenuItem(newItem);
        resetForm(); // Call the reset form after adding an item
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setPrice('');
        setCourse('Starters');
        setShowAddMenuItem(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image
                    source={require('../my-app/assets/cheff.jpeg')}
                    style={styles.profileImage}
                />
                <Text style={styles.chefName}>Chef Christoffel</Text>
            </View>

            <Text style={styles.header}>Menu</Text>
            <Text>Total Menu Items: {totalMenuItems}</Text>

            {showAddMenuItem ? (
                <View style={styles.addItemContainer}>
                    <Text style={styles.header}>Add Menu Item</Text>
                    <TextInput
                        placeholder="Dish Name"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Price"
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
                        style={styles.input}
                    />

                    <Picker
                        selectedValue={course}
                        onValueChange={(itemValue: string) => setCourse(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Starters" value="Starters" />
                        <Picker.Item label="Main" value="Main" />
                        <Picker.Item label="Dessert" value="Dessert" />
                    </Picker>

                    <Button title="Add Item" onPress={handleAddItem} />
                    
                </View>
            ) : (
                <FlatList
                    data={menuItems}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.menuItem}>
                            <Text style={styles.dishName}>{item.name}</Text>
                            <Text>${item.price}</Text>
                            <Text>{item.description}</Text>
                            <Text>{item.course}</Text>
                            <TouchableOpacity onPress={() => removeMenuItem(item.id)}>
                                <Text style={styles.removeButton}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}

            <Button title={showAddMenuItem ? 'Cancel' : 'Add Menu Item'} onPress={() => setShowAddMenuItem(!showAddMenuItem)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#4682b4',
        borderRadius: 8,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    chefName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    menuItem: {
        marginBottom: 16,
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
    },
    dishName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    removeButton: {
        color: 'red',
        marginTop: 10,
        textAlign: 'right',
    },
    addItemContainer: {
        marginBottom: 20,
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    picker: {
        height: 50,
        marginBottom: 20,
    },
});

export default HomeScreen;
