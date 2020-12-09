function New_Game () {
    basic.pause(1000)
    game_mode = randint(1, 4)
    if (game_mode == 1) {
        basic.showString("FLIP")
        Game_Flip()
    }
    if (game_mode == 2) {
        basic.showString("RESET")
        Game_Reset()
    }
    if (game_mode == 3) {
        basic.showString("SET")
        Game_Set()
    }
    if (game_mode == 4) {
        basic.showString("CONVERT")
        Game_Convert()
    }
}
function Validate_AND_OR () {
    if (game_mode == 2) {
        AND_OR_CORRECT_CHOICE = 1
    }
    if (game_mode == 3) {
        AND_OR_CORRECT_CHOICE = 2
    }
    if (AND_OR == AND_OR_CORRECT_CHOICE) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showIcon(IconNames.No)
        game.gameOver()
    }
}
function Game_mode_validate () {
    if (game_mode == 1) {
        validate_Flip()
    }
    if (game_mode == 2) {
        validate_Reset()
    }
    if (game_mode == 3) {
        validate_Set()
    }
    if (game_mode == 4) {
        validate_Set()
    }
}
input.onButtonPressed(Button.A, function () {
    answer.push(1)
    AND_OR = 1
})
function Next_game () {
    game.addScore(1)
    answer = []
    question = []
    AND_OR = 0
    New_Game()
}
function validate_Flip () {
    for (let value = 0; value <= 3; value++) {
        if (question[value] == answer[value]) {
            game.gameOver()
            control.reset()
        }
    }
    Next_game()
}
function Guide_And_Or () {
    basic.pause(1000)
    basic.showString("A = AND")
    basic.pause(200)
    basic.showString("B = OR")
}
function validate_Convert () {
    for (let value = 0; value <= 3; value++) {
        if (binary_after_converted[value] != answer[value]) {
            game.gameOver()
            control.reset()
        }
    }
    Next_game()
}
function Prepare_answer_for_set_reset () {
    possible_index = [0, 1, 2, 3]
    possible_index.removeAt(_py.py_array_index(possible_index, bit_to_change))
    answer.reverse()
}
function change_binary (n: number) {
    binary_after_converted = []
    while (n != 0) {
        binary_after_converted.push(n % 2)
        n = Math.idiv(n, 2)
    }
    binary_after_converted.reverse()
    return binary_after_converted
}
function Show_question () {
    basic.clearScreen()
    basic.pause(200)
    for (let index = 0; index < 4; index++) {
        question.push(randint(0, 1))
    }
    for (let index2 = 0; index2 <= 3; index2++) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
        basic.showNumber(question[index2])
    }
}
function validate_Set () {
    Prepare_answer_for_set_reset()
    if (answer.removeAt(bit_to_change) == 1) {
        for (let index = 0; index < 4; index++) {
            if (answer[0] == 0) {
                continue;
            } else {
                game.gameOver()
            }
        }
    } else {
        game.gameOver()
    }
    Next_game()
}
input.onButtonPressed(Button.AB, function () {
    Game_mode_validate()
})
input.onButtonPressed(Button.B, function () {
    answer.push(0)
    AND_OR = 2
})
function Game_Reset () {
    Bit_index_select()
    Guide_And_Or()
    basic.pause(5000)
    Validate_AND_OR()
    answer = []
    Guide_1_0()
}
function Game_Flip () {
    Show_question()
    Guide_1_0()
}
function Guide_1_0 () {
    basic.pause(1000)
    basic.showString("A = 1")
    basic.pause(200)
    basic.showString("B = 0")
}
function validate_Reset () {
    Prepare_answer_for_set_reset()
    if (answer.removeAt(bit_to_change) == 0) {
        for (let index = 0; index < 4; index++) {
            if (answer[0] == 1) {
                continue;
            } else {
                game.gameOver()
            }
        }
    } else {
        game.gameOver()
    }
    Next_game()
}
function Game_Convert () {
    decimal = randint(0, 16)
    change_binary(decimal)
    basic.showString("" + (decimal))
}
function Game_Set () {
    Bit_index_select()
    Guide_And_Or()
    basic.pause(5000)
    Validate_AND_OR()
    answer = []
    Guide_1_0()
}
function Bit_index_select () {
    bit_to_change = randint(0, 3)
    basic.showString("#")
    basic.showNumber(bit_to_change)
}
let decimal = 0
let n = 0
let binary_after_converted: number[] = []
let question: number[] = []
let answer: number[] = []
let AND_OR = 0
let AND_OR_CORRECT_CHOICE = 0
let game_mode = 0
let possible_index : number[] = []
let bit_to_change = 0
New_Game()
basic.forever(function () {
	
})
