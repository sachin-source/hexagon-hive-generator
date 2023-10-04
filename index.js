import { standardRowDistribution } from './constants.js';

const getRowDistribution =  (numberOfHex) => {
    let rowDistributionArray = Object.keys(standardRowDistribution)
    if(rowDistributionArray.includes(numberOfHex.toString())){
        return standardRowDistribution[numberOfHex];
    }else{
        for (let index = 0; index < rowDistributionArray.length; index++) {
            if(Number(rowDistributionArray[index])>numberOfHex){
                return standardRowDistribution[Number(rowDistributionArray[index])]
            }
        }
    }
}

const calcDimensions = (numberOfHex, rowDistribution, config={}) => {
    const { beginX=0, beginY=0 } = config;

    const a4width = 840;

    let reportDimensions = {
        marginX: beginX,
        marginY: beginY,
        marginMidX: 0,
        marginMidY: 0,
        hexRadius: 29, // 25
        hexWidth: 0,
        hiveHeight: 0,
        hiveWidth: 0,
        marginText: 0
    }
        const totalHexagons = numberOfHex;

        reportDimensions.hexWidth = (Math.floor(reportDimensions.hexRadius * (Math.sqrt(3)) / 2)) * 2;
        reportDimensions.marginMidX = reportDimensions.hexWidth;

        let widthOfHive = reportDimensions.hexWidth * (Math.max(...rowDistribution));
        let remainingX = a4width - widthOfHive;

        reportDimensions.hiveWidth = widthOfHive;
        reportDimensions.marginX =  beginX || remainingX / 2;

        const numberOfRows = rowDistribution.length

        let hiveHeight = 0;
        const hexHeight = reportDimensions.hexRadius * 2;
        for (let row = 1; row <= numberOfRows; row++) {
            if (row % 2 !== 0) {
                hiveHeight += 1;
            } else {
                hiveHeight += reportDimensions.hexRadius;
            }
        }
        reportDimensions.hiveHeight = hiveHeight;
        reportDimensions.marginMidY = hexHeight;
        reportDimensions.marginY = hexHeight;

        // if (numberOfHives <= 3) {
            reportDimensions.marginY += 60;
        // }

        if (reportDimensions.hexRadius === 25) {
            reportDimensions.marginY += 20;
            reportDimensions.marginMidY += 20;
        }

        reportDimensions.marginText = reportDimensions.marginY + (reportDimensions.marginMidY * 1.5) + (reportDimensions.hiveHeight * 2)

    return reportDimensions;
}

const initHexStructure = (rowDistribution, marginX, marginY, hexWidth, hexRadius) => {

    let hexStructure = {};
    const numberOfRows = rowDistribution.length;
    let testCount = 0;
    for (let row = 1; row <= numberOfRows; row++) {

        hexStructure[`row${row}`] = {}
        let hexgonsInRow = rowDistribution[row - 1];
        let newRow = true;

        for (let hex = 1; hex <= hexgonsInRow; hex++) {

            testCount += 1;

            hexStructure[`row${row}`][`T${testCount}`] = {};

            for (let point = 65; point <= 70; point++) {
                let pointChar = String.fromCharCode(point);
                hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`] = {};

                if (testCount === 1) {
                    switch (pointChar) {
                        case 'A': {
                            hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['x'] = marginX + (hexWidth / 2);
                            hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['y'] = marginY + (hexRadius / 2);
                            break;
                        }
                        case 'B': {
                            hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['x'] = marginX + (hexWidth);
                            hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['y'] = marginY;
                            break;
                        }
                        case 'C': {
                            hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['x'] = marginX + (hexWidth) + (hexWidth / 2);
                            hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['y'] = marginY + (hexRadius / 2);
                            break;
                        }
                        case 'D': {
                            hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['x'] = marginX + (hexWidth) + (hexWidth / 2);
                            hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['y'] = marginY + (hexRadius * 1.5);
                            break;
                        }
                        case 'E': {
                            hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['x'] = marginX + (hexWidth);
                            hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['y'] = marginY + (hexRadius * 2);
                            break;
                        }
                        case 'F': {
                            hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['x'] = marginX + (hexWidth / 2);
                            hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['y'] = marginY + (hexRadius * 1.5);
                            break;
                        }
                    }
                } else if (newRow) {
                    let hexagonsInPreviousRow = rowDistribution[row - 2];
                    if (hexgonsInRow > hexagonsInPreviousRow) {
                        let previousRowLeadingTest = testCount - rowDistribution[row - 2];
                        switch (pointChar) {
                            case 'A': {
                                hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['x'] = hexStructure[`row${row - 1}`][`T${previousRowLeadingTest}`][`${pointChar}`]['x'] - (hexWidth / 2);
                                hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['y'] = hexStructure[`row${row - 1}`][`T${previousRowLeadingTest}`][`${pointChar}`]['y'] + (hexRadius * 1.5);
                                break;
                            }
                            case 'B': {
                                hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['x'] = hexStructure[`row${row - 1}`][`T${previousRowLeadingTest}`][`${pointChar}`]['x'] - (hexWidth / 2);
                                hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['y'] = hexStructure[`row${row - 1}`][`T${previousRowLeadingTest}`][`${pointChar}`]['y'] + (hexRadius * 1.5);
                                break;
                            }
                            case 'C': {
                                hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['x'] = hexStructure[`row${row - 1}`][`T${previousRowLeadingTest}`][`${pointChar}`]['x'] - (hexWidth / 2);
                                hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['y'] = hexStructure[`row${row - 1}`][`T${previousRowLeadingTest}`][`${pointChar}`]['y'] + (hexRadius * 1.5)
                                break;
                            }
                            case 'D': {
                                hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['x'] = hexStructure[`row${row - 1}`][`T${previousRowLeadingTest}`][`${pointChar}`]['x'] - (hexWidth / 2);
                                hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['y'] = hexStructure[`row${row - 1}`][`T${previousRowLeadingTest}`][`${pointChar}`]['y'] + (hexRadius * 1.5)
                                break;
                            }
                            case 'E': {
                                hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['x'] = hexStructure[`row${row - 1}`][`T${previousRowLeadingTest}`][`${pointChar}`]['x'] - (hexWidth / 2);
                                hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['y'] = hexStructure[`row${row - 1}`][`T${previousRowLeadingTest}`][`${pointChar}`]['y'] + (hexRadius * 1.5)
                                break;
                            }
                            case 'F': {
                                hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['x'] = hexStructure[`row${row - 1}`][`T${previousRowLeadingTest}`][`${pointChar}`]['x'] - (hexWidth / 2);
                                hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['y'] = hexStructure[`row${row - 1}`][`T${previousRowLeadingTest}`][`${pointChar}`]['y'] + (hexRadius * 1.5)
                                break;
                            }
                        }
                    } else {
                        let previousRowLeadingTest = testCount - rowDistribution[row - 2];
                        switch (pointChar) {
                            case 'A': {
                                hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['x'] = hexStructure[`row${row - 1}`][`T${previousRowLeadingTest}`][`${pointChar}`]['x'] + (hexWidth / 2);
                                hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['y'] = hexStructure[`row${row - 1}`][`T${previousRowLeadingTest}`][`${pointChar}`]['y'] + (hexRadius * 1.5);
                                break;
                            }
                            case 'B': {
                                hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['x'] = hexStructure[`row${row - 1}`][`T${previousRowLeadingTest}`][`${pointChar}`]['x'] + (hexWidth / 2);
                                hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['y'] = hexStructure[`row${row - 1}`][`T${previousRowLeadingTest}`][`${pointChar}`]['y'] + (hexRadius * 1.5);
                                break;
                            }
                            case 'C': {
                                hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['x'] = hexStructure[`row${row - 1}`][`T${previousRowLeadingTest}`][`${pointChar}`]['x'] + (hexWidth / 2);
                                hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['y'] = hexStructure[`row${row - 1}`][`T${previousRowLeadingTest}`][`${pointChar}`]['y'] + (hexRadius * 1.5)
                                break;
                            }
                            case 'D': {
                                hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['x'] = hexStructure[`row${row - 1}`][`T${previousRowLeadingTest}`][`${pointChar}`]['x'] + (hexWidth / 2);
                                hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['y'] = hexStructure[`row${row - 1}`][`T${previousRowLeadingTest}`][`${pointChar}`]['y'] + (hexRadius * 1.5)
                                break;
                            }
                            case 'E': {
                                hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['x'] = hexStructure[`row${row - 1}`][`T${previousRowLeadingTest}`][`${pointChar}`]['x'] + (hexWidth / 2);
                                hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['y'] = hexStructure[`row${row - 1}`][`T${previousRowLeadingTest}`][`${pointChar}`]['y'] + (hexRadius * 1.5)
                                break;
                            }
                            case 'F': {
                                hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['x'] = hexStructure[`row${row - 1}`][`T${previousRowLeadingTest}`][`${pointChar}`]['x'] + (hexWidth / 2);
                                hexStructure[`row${row}`][`T${testCount}`][`${pointChar}`]['y'] = hexStructure[`row${row - 1}`][`T${previousRowLeadingTest}`][`${pointChar}`]['y'] + (hexRadius * 1.5)
                                break;
                            }
                        }
                    }
                } else {
                    let pointArr = Object.keys(hexStructure[`row${row}`][`T${testCount}`]);
                    pointArr.forEach(hexPoint => {
                        hexStructure[`row${row}`][`T${testCount}`][hexPoint]['x'] = hexStructure[`row${row}`][`T${testCount - 1}`][hexPoint]['x'] + hexWidth;
                        hexStructure[`row${row}`][`T${testCount}`][hexPoint]['y'] = hexStructure[`row${row}`][`T${testCount - 1}`][hexPoint]['y'];
                    });
                }
            }
            newRow = false;
        }
    }
    // console.log('Hex Structure', hexStructure);
    return hexStructure;
}

const getHeaderCoordinates = (attempt, rowDistribution, hexStructure, reportDimensions) => {

    const row = 1;
    const lastTestOnRow1 = rowDistribution[0];

    let xcenter = hexStructure[`row${row}`][`T1`]['B']['x'] + (hexStructure[`row${row}`][`T${lastTestOnRow1}`]['B']['x'] - hexStructure[`row${row}`][`T1`]['B']['x']) / 2;
    xcenter = xcenter - reportDimensions.hexWidth / 2;
    let ycenter = hexStructure[`row${row}`][`T1`]['B']['y'] - 20;

    if (attempt < 3) {
        xcenter = xcenter + (reportDimensions.hiveWidth + reportDimensions.marginMidX) * attempt;
    }
    if (attempt >= 3) {
        xcenter = xcenter + (reportDimensions.hiveWidth + reportDimensions.marginMidX) * (attempt - 3);
        ycenter = ycenter + reportDimensions.hiveHeight + reportDimensions.marginMidY;
    }

    return {
        x: xcenter,
        y: ycenter
    }
}

const getHexPath = (hexStructure, test, row, attempt, reportDimensions) => {
    let xDeviation = 0;
    let yDeviation = 0;

    if (attempt > 0 && attempt < 3) {
        xDeviation = (reportDimensions.hiveWidth + reportDimensions.marginMidX) * attempt;
    }

    if (attempt === 3) {
        xDeviation = 0;
        yDeviation = reportDimensions.hiveHeight + reportDimensions.marginMidY;
    }

    if (attempt > 3) {
        xDeviation = (reportDimensions.hiveWidth + reportDimensions.marginMidX) * (attempt - 3);
        yDeviation = reportDimensions.hiveHeight + reportDimensions.marginMidY;
    }

    const cord = hexStructure[`row${row}`][`T${test}`];

    return `M ${cord['A']['x'] + xDeviation}, ${cord['A']['y'] + yDeviation}, L ${cord['B']['x'] + xDeviation}, ${cord['B']['y'] + yDeviation}, L ${cord['C']['x'] + xDeviation}, ${cord['C']['y'] + yDeviation}, L ${cord['D']['x'] + xDeviation}, ${cord['D']['y'] + yDeviation}, L ${cord['E']['x'] + xDeviation}, ${cord['E']['y'] + yDeviation}, L ${cord['F']['x'] + xDeviation}, ${cord['F']['y'] + yDeviation} Z`;
}

const getHexColor = (score) => {

    if (score >= 80) {
        return '#00b050';
    }
    if (score >= 70 && score <= 79) {
        return '#92d050';
    }
    if (score >= 60 && score <= 69) {
        return '#fffd87';
    }
    if (score >= 40 && score <= 59) {
        return '#ffc000';
    }
    if (score >= 0 && score <= 39) {
        return '#ff0000';
    }
    return '#FFFFFF';
}

const getHexCenterX = (hexStructure, attempt, row, test, reportDimensions) => {

    let xcenter = hexStructure[`row${row}`][`T${test}`]['A']['x'] + (hexStructure[`row${row}`][`T${test}`]['C']['x'] - hexStructure[`row${row}`][`T${test}`]['A']['x']) / 2;
    if (attempt < 3) {
        xcenter = xcenter + (reportDimensions.hiveWidth + reportDimensions.marginMidX) * attempt;
    }

    if (attempt > 3) {
        xcenter = xcenter + (reportDimensions.hiveWidth + reportDimensions.marginMidX) * (attempt - 3);
    }
    return xcenter;
}

const getHexCenterY = (hexStructure, attempt, row, test, reportDimensions) => {
    let ycenter = hexStructure[`row${row}`][`T${test}`]['B']['y'] + (hexStructure[`row${row}`][`T${test}`]['E']['y'] - hexStructure[`row${row}`][`T${test}`]['B']['y']) / 2;
    if (attempt >= 3) {
        ycenter = ycenter + reportDimensions.hiveHeight + reportDimensions.marginMidY;
    }
    return ycenter;
}

/**
 * 
 * @param {[number]} scores 
 * @abstract Function takes array of scores and generates SVG paths for the hexagon hive
 * @returns JSON Obj : includes row distribution, hexagon dimentions, svg paths, colors and view box
 */
const generateHexagonCluster = (scores = [], config={}) => {
    const { beginX, beginY } = config;
    const rowDistribution = getRowDistribution(scores.length);

    const reportDimensionsPost = calcDimensions(scores.length, rowDistribution, {beginX, beginY})
    const hexStructurePost = initHexStructure(rowDistribution, reportDimensionsPost.marginX, reportDimensionsPost.marginY, reportDimensionsPost.hexWidth, reportDimensionsPost.hexRadius)
    const headerCoordinatesPost = [];
    for (let i = 0; i < 1; i++) {
        headerCoordinatesPost.push(getHeaderCoordinates(i, rowDistribution, hexStructurePost, reportDimensionsPost));
    }
    const { marginX, marginY, hiveHeight, hiveWidth, hexWidth } = reportDimensionsPost;

    const hexCentersXPost = [];
    const hexCentersYPost = [];
    const hexPathsPost = [];
    const hexColorsPost = [];

    for (let a = 0; a < 1; a++) {
        let topicNumber = 0;
        const rowsInStruct = Object.keys(hexStructurePost);

        rowsInStruct.forEach((row, index) => {
            const testsInRow = Object.keys(hexStructurePost[`row${index + 1}`]);
            testsInRow.forEach(test => {
                try {
                    topicNumber += 1;
                    const score = scores[topicNumber - 1] >= 0 ? scores[topicNumber - 1] : -1
                    hexCentersXPost.push(getHexCenterX(hexStructurePost, a, index + 1, topicNumber, reportDimensionsPost) - 4);
                    hexCentersYPost.push(getHexCenterY(hexStructurePost, a, index + 1, topicNumber, reportDimensionsPost) - 4);
                    hexPathsPost.push(getHexPath(hexStructurePost, topicNumber, index + 1, a, reportDimensionsPost));
                    hexColorsPost.push(getHexColor(score));
                } catch (error) {
                };
            });
        });
    };
    const viewBox = `${ marginX + (hexWidth / 2)} ${marginY} ${hiveWidth} ${hiveHeight}`;
    return ({ rowDistribution, reportDimensionsPost, hexStructurePost, headerCoordinatesPost, hexCentersXPost, hexCentersYPost, hexColorsPost, hexPathsPost, viewBox })
}

export default generateHexagonCluster;