def on_pin_pressed_p0():
    change_binary(randint(0, 16))
    basic.show_string("" + str((binary_after_converted)))
input.on_pin_pressed(TouchPin.P0, on_pin_pressed_p0)

def New_Game():
    global game_mode
    basic.pause(1000)
    game_mode = randint(1, 3)
    if game_mode == 1:
        basic.show_string("FLIP")
        Game_Flip()
    if game_mode == 2:
        basic.show_string("RESET")
        Game_Reset()
    if game_mode == 3:
        basic.show_string("SET")
        Game_Set()
def Validate_AND_OR():
    global AND_OR_CORRECT_CHOICE
    if game_mode == 2:
        AND_OR_CORRECT_CHOICE = 1
    if game_mode == 3:
        AND_OR_CORRECT_CHOICE = 2
    if AND_OR == AND_OR_CORRECT_CHOICE:
        basic.show_icon(IconNames.YES)
    else:
        basic.show_icon(IconNames.NO)
        game.game_over()
def Game_mode_validate():
    if game_mode == 1:
        validate_Flip()
    if game_mode == 2:
        validate_Reset()
    if game_mode == 3:
        validate_Set()

def on_button_pressed_a():
    global AND_OR
    answer.append(1)
    AND_OR = 1
input.on_button_pressed(Button.A, on_button_pressed_a)

def Next_game():
    game.add_score(1)
    Reset_Arrays()
    New_Game()
def validate_Flip():
    for value in range(4):
        if question[value] == answer[value]:
            game.game_over()
            control.reset()
    Next_game()
def Guide_And_Or():
    basic.pause(1000)
    basic.show_string("A = AND")
    basic.pause(200)
    basic.show_string("B = OR")
def Prepare_answer_for_set_reset():
    global possible_index
    possible_index = [0, 1, 2, 3]
    possible_index.remove_at(possible_index.index(bit_to_change))
    answer.reverse()
def change_binary(n: number):
    global binary_after_converted
    binary_after_converted = []
    while n != 0:
        binary_after_converted.append(n % 2)
        n = Math.idiv(n, 2)
    binary_after_converted.reverse()
    return binary_after_converted
def Show_question():
    basic.clear_screen()
    basic.pause(200)
    for index in range(4):
        question.append(randint(0, 1))
    for index2 in range(4):
        basic.show_leds("""
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            """)
        basic.show_number(question[index2])
def validate_Set():
    Prepare_answer_for_set_reset()
    if answer.remove_at(bit_to_change) == 1:
        for index3 in range(4):
            if answer[0] == 0:
                continue
            else:
                game.game_over()
    else:
        game.game_over()
    Next_game()

def on_button_pressed_ab():
    Game_mode_validate()
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    global AND_OR
    answer.append(0)
    AND_OR = 2
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_gesture_shake():
    control.reset()
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

def Game_Reset():
    global answer
    Bit_index_select()
    Guide_And_Or()
    basic.pause(5000)
    Validate_AND_OR()
    answer = []
    Guide_1_0()
def Game_Flip():
    Show_question()
    Guide_1_0()
def Guide_1_0():
    basic.pause(1000)
    basic.show_string("A = 1")
    basic.pause(200)
    basic.show_string("B = 0")
def validate_Reset():
    Prepare_answer_for_set_reset()
    if answer.remove_at(bit_to_change) == 0:
        for index4 in range(4):
            if answer[0] == 1:
                continue
            else:
                game.game_over()
    else:
        game.game_over()
    Next_game()
def Reset_Arrays():
    global answer, question, AND_OR
    answer = []
    question = []
    AND_OR = 0
def Game_Set():
    global answer
    Bit_index_select()
    Guide_And_Or()
    basic.pause(5000)
    Validate_AND_OR()
    answer = []
    Guide_1_0()
def Bit_index_select():
    global bit_to_change
    bit_to_change = randint(0, 3)
    basic.show_string("#")
    basic.show_number(bit_to_change)
n = 0
question: List[number] = []
answer: List[number] = []
AND_OR = 0
AND_OR_CORRECT_CHOICE = 0
game_mode = 0
binary_after_converted: List[number] = []
possible_index: List[number] = []
bit_to_change = 0
New_Game()

def on_forever():
    pass
basic.forever(on_forever)
