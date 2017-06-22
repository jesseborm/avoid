import React, { Component } from 'react';
import Board from '../components/Board'
import Player from '../components/firstPlayer'
import secondPlayer from '../components/secondPlayer'

// import { pluck } from 'helpers/utils';

const UP = 'UP';
const DOWN = 'DOWN';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';

const getDefaultState = ({ boardSize = 25 , playerSize = 25}) => {
    const half = Math.floor(boardSize / 2) * playerSize;
    return {
        size: {
            board: boardSize,
            player: playerSize,
            maxDim: boardSize * playerSize
        },
        positions: {
            player: {
                top: half,
                left: half
            },
        }
    }
};

export default class Game extends Component {
    constructor(props) {
        super(props);
        const { boardSize, playerSize } = props;
        this.state = getDefaultState({ boardSize, playerSize })
    }

    handlePlayerMovement = (dirObj) => {
        const { top, left } = this.state.positions.player;
        const { player, maxDim } = this.state.size;

        // check walls
        switch (dirObj.dir) {
            case UP:
                if (top === 0) return;
                break;
            case DOWN:
                if (top === maxDim - player) return;
                break;
            case LEFT:
                if (left === 0) return;
                break;
            case RIGHT:
                if (left === maxDim - player) return;
                break;
        }

        this.setState({
            positions: {
                ...this.state.positions,
                player: {
                    top: top + (player * dirObj.top),
                    left: left + (player * dirObj.left)
                }
            }
        });
    }

    style = () => {
        return {
            width: '85%',
            maxWidth: '600px',
            margin: '0 auto'
        };
    }

    render() {
        const {
            size: { board, player },
            positions: { player: playerPos },
        } = this.state;

        return (
            <div style={this.style()}>
                <Board dimension={board * player}>
                    <Player
                        size={player}
                        position={playerPos}
                        handlePlayerMovement={this.handlePlayerMovement} />
                </Board>
            </div>
        )
    }
}