export const randomColor = () => {
    // let colours = ["#199AB7", "#ED7D31", "#06124e", "#FFC000", "#084056", "#0AFFF0", "#00aeef", "#1c75bc", "#8dc63f", "#009444", "#f7941d", "#ef4136", "#ed1c24", "#b61d22"]
    // colours = _.shuffle(colours);
    // return colours.pop()
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}