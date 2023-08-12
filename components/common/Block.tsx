import React, { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { Button, Card } from "react-native-paper";
import theme from "../app/theme";

type BlockProps = {
    actionEnabled?: boolean,
    action1Press?: any,
    action1Title?: string,
    style?: any,
    contentStyle?: any,
    title?: string,
    titleActionBtns?: React.ReactNode
}

export default function Block(props: PropsWithChildren<BlockProps>) {
    return <Card style={[styles.card, props.style]} elevation={5}>
        {props.title && (
            <Card.Title
                title={props.title}
                titleVariant="headlineLarge"
                right={(innerProps: { size: number }) => props.titleActionBtns}

            />
        )}
        <Card.Content style={props.contentStyle}>
            {props.children}
        </Card.Content>
        {props.actionEnabled && (
            <Card.Actions style={styles.actions}>
                <Button onPress={props.action1Press}>{props.action1Title}</Button>
            </Card.Actions>
        )}
    </Card>
}


const styles = StyleSheet.create({
    card: {
        flex: 1,
        marginBottom: 10,
        backgroundColor: theme.COLORS.WHITE,
    },
    actions: {
        alignContent: 'flex-end',
        textAlignVertical: 'bottom',
        verticalAlign: 'bottom'
    },
});