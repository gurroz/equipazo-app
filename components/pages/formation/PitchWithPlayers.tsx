import React, { Component } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { FIELD_BK } from "../../../assets/images";
import { Formation } from "../../../domain/Formation";
import { FormationPosition } from "../../../domain/FormationPosition";
import DragableCircularButton from "../../common/DragableCircularButton";

type PitchProps = {
    formation: Formation;
    pitchHeight: number;
    pitchWidth: number;
}

export class PitchWithPlayers extends Component<PitchProps> {
    constructor(props: PitchProps) {
        super(props);
    }

    shouldComponentUpdate(nextProps: Readonly<PitchProps>, nextState: Readonly<{}>, nextContext: any): boolean {
        return this.props.pitchHeight !== nextProps.pitchHeight || this.props.formation.name !==   nextProps.formation.name;
    }

    drawPlayerInFormation = () => {
        if (this.props.formation) {
            return this.props.formation.playersPositions.map((playersPosition, index) => {
                const name = playersPosition.player ? playersPosition.player.name : playersPosition.position.toString();
                console.log("Player Positon", name, playersPosition.getPositionCoordX(), playersPosition.getPositionCoordY())
                return <DragableCircularButton
                    key={name + (this.getRandomID(index))}
                    name={name}
                    onShortPress={() => console.log("WEENA")}
                    onDragRelease={(event: any, gestureState: any, bounds: any) => this.updatePlayerPosition(playersPosition, bounds)}
                    posX={playersPosition.getPositionCoordX()}
                    posY={playersPosition.getPositionCoordY()}
                    maxHeight={this.props.pitchHeight}
                    maxWidth={this.props.pitchWidth}
                />
            })
        }
    }

     getRandomID = (ix: number) => {
        return ix * Math.floor(Math.random() * 10000);
      }

    updatePlayerPosition = (playersPosition: FormationPosition, bounds: any) => {
        playersPosition.coordX = bounds.left > 0 ? bounds.left : undefined;
        playersPosition.coordY = bounds.top > 0 ? bounds.top : undefined;
    }

    // TODO: On update remove all drawing?
    render() {
        console.log("PitchWithPlayers DRAWING", this.props.pitchHeight, this.props.pitchWidth);

        return (
            <ImageBackground source={FIELD_BK} style={styles.image}>
                {this.drawPlayerInFormation()}
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
});
