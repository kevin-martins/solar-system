const texturePath = (planet, texture, ext = '.jpg') => {
    try {
        return process.env.PUBLIC_URL + '/assets/' + planet + '/' + texture + ext;
    } catch (error) {
        console.error('Error in texturePath:', error);
        return '';
    }
}

const addCoordinates = (base, add) =>
    base.map((el, i) => el + add[i])

const capitalize = ([...str]) =>
    str[0].toUpperCase() + str.splice(1, str.length).join('')

export { texturePath, addCoordinates, capitalize }