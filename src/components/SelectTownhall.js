import React, { useState } from 'react'

const wizardTowerData = `1	11	14.3	620	120,000	3h	103	5
2	13	16.9	650	220,000	8h	169	5
3	16	20.8	680	420,000	12h	207	6
4	20	26	730	720,000	18h	254	7
5	24	31.2	840	920,000	1d	293	8
6	32	41.6	960	1,200,000	1d 12h	360	8
7	40	52	1,200	2,200,000	2d	415	9
8	45	58.5	1,440	2,700,000	3d	509	10
9	50	65	1,680	3,700,000	5d 6h	673	10
10	62	80.6	2,000	5,200,000	6d 12h	749	11
11	70	91	2,240	7,200,000	9d	881	12
12	78	101.4	2,480	9,200,000	9d 12h	905	13
13	84	109.2	2,700	10,200,000	10d	929	13
14	90	117	2,900	17,200,000	17d	1,211	14
15	95	123.5	3,000	19,200,000	18d	1,247	15`;

const cannonData = `1	9	7.2	420	250	10s	3	1
2	11	8.8	470	1,000	2m	10	1
3	15	12	520	4,000	10m	24	2
4	19	15.2	570	16,000	45m	51	3
5	25	20	620	50,000	2h	84	4
6	31	24.8	670	100,000	4h	120	5
7	40	32	730	200,000	8h	169	6
8	48	38.4	800	300,000	10h	189	7
9	56	44.8	880	500,000	12h	207	8
10	64	51.2	960	700,000	18h	254	8
11	74	59.2	1,060	1,000,000	1d	293	9
12	85	68	1,160	1,200,000	1d 6h	328	10
13	95	76	1,260	1,700,000	2d 6h	440	10
14	105	84	1,380	2,100,000	3d	509	11
15	115	92	1,500	3,200,000	4d 6h	605	11
16	120	96	1,620	4,400,000	5d 12h	689	12
17	125	100	1,740	5,600,000	7d 12h	804	12
18	130	104	1,870	6,500,000	9d	881	13
19	140	112	2,000	7,800,000	9d 12h	905	13
20	150	120	2,150	16,500,000	16d 6h	1,184	14
21	160	128	2,250	18,000,000	17d	1,211	15`

const archerTowerData = `1	11	5.5	380	1,000	1m	7	2
2	15	7.5	420	2,000	15m	30	2
3	19	9.5	460	5,000	45m	51	3
4	25	12.5	500	20,000	3h	103	4
5	30	15	540	80,000	5h	134	5
6	35	17.5	580	180,000	8h	169	5
7	42	21	630	360,000	10h	189	6
8	48	24	690	600,000	12h	207	7
9	56	28	750	800,000	14h	224	8
10	63	31.5	810	1,000,000	18h	254	8
11	70	35	890	1,200,000	1d	293	9
12	75	37.5	970	1,500,000	1d 6h	328	10
13	80	40	1,050	2,000,000	2d 6h	440	10
14	90	45	1,130	2,500,000	3d 12h	549	11
15	100	50	1,230	3,500,000	5d	657	11
16	105	52.5	1,330	4,700,000	5d 12h	689	12
17	110	55	1,410	6,100,000	7d 12h	804	12
18	120	60	1,510	6,800,000	9d	881	13
19	130	65	1,600	8,000,000	9d 12h	905	13
20	138	69	1,700	16,500,000	16d 6h	1,184	14
21	145	72.5	1,800	18,500,000	17d	1,211	15`;

const mortarData = `1	4	20	400	5,000	3h	103	3
2	5	25	450	25,000	6h	146	4
3	6	30	500	100,000	12h	207	5
4	7	35	550	200,000	1d	293	6
5	9	45	600	400,000	2d	415	7
6	11	55	650	750,000	2d 12h	464	8
7	15	75	700	1,500,000	3d	509	9
8	20	100	800	2,500,000	3d 6h	529	10
9	25	125	950	3,500,000	4d 6h	605	11
10	30	150	1,100	4,800,000	5d 12h	689	11
11	35	175	1,300	5,800,000	7d 12h	804	12
12	38	190	1,500	6,500,000	8d 18h	869	12
13	42	210	1,700	8,200,000	9d 12h	905	13
14	48	240	1,950	16,500,000	17d	1,211	14
15	54	270	2,150	19,000,000	18d	1,247	15`;

const airDefenseData = `1	80	80	800	22,000	3h	103	4
2	110	110	850	90,000	12h	207	4
3	140	140	900	270,000	16h	240	5
4	160	160	950	500,000	1d	293	6
5	190	190	1,000	1,000,000	1d 12h	360	7
6	230	230	1,050	1,350,000	2d	415	8
7	280	280	1,100	1,750,000	3d	509	9
8	320	320	1,210	3,000,000	4d 6h	605	10
9	360	360	1,300	4,200,000	6d 6h	734	11
10	400	400	1,400	5,800,000	8d 18h	869	12
11	440	440	1,500	8,400,000	9d 12h	905	13
12	500	500	1,650	17,000,000	17d	1,211	14
13	540	540	1,750	19,500,000	18d	1,247	15`;


const extractColumns = (data, name) => {
    const rows = data.split('\n');
    const result = [[name]];
    rows.map((row) => {
        const columns = row.split('\t');
        result.push([columns[0], columns[4], columns[5], columns[7]]);
    });

    return result;
};

function FilteredBuildings(buildings, th) {
    let result = [];
    Object.keys(buildings).forEach(key => {
        buildings[key].forEach(array => {
            console.log(array);
            if (array[3] <= th) {
                result.push(array);
            } else if (array.length === 1) {
                result.push(array);
            }
        });
    });

    console.log(buildings);
    return CreateDivsForBuildings(result);
}

function CreateDivsForBuildings(array) {
    const classNames = array.filter(innerArray => innerArray.length === 1);
    let currentClassName;

    const result = array.map((item, index) => {
        if (item.length === 1) {
            currentClassName = classNames.shift();
        }

        return (
            <div className={currentClassName} key={index}>
                {item.map((element, subIndex) => (
                    <span key={subIndex}>{element}</span>
                ))}
            </div>
        );
    });

    // Group elements by class name
    const groupedByClassName = {};
    result.forEach((element) => {
        const className = element.props.className;
        if (!groupedByClassName[className]) {
            groupedByClassName[className] = [];
        }
        groupedByClassName[className].push(element);
    });

    // Wrap divs with the same class name in an outer div using classname as key
    const wrappedResult = Object.keys(groupedByClassName).map((className, index) => (
        <div className={className+ "Div"} key={className}>
            {groupedByClassName[className]}
        </div>
    ));

    return wrappedResult;
}



function SelectTownhall() {

    const [buildingDiv, setBuildingsDiv] = useState(null);

    const buildings = {
        "cannonData": extractColumns(cannonData, "cannon"),
        "archerTowerData": extractColumns(archerTowerData, "archerTower"),
        "mortarData": extractColumns(mortarData, "mortar"),
        "airDefenseData": extractColumns(airDefenseData, "airDefense"),
        "wizardTowerData": extractColumns(wizardTowerData, "wizardTower")
    }

    const handleTownhallButtonClick = (th) => {
        setBuildingsDiv(true);
        setBuildingsDiv(FilteredBuildings(buildings, th));

    };

    return (
        <div className='Townhall'>
            <div className='Buttons'>
                <button onClick={() => handleTownhallButtonClick(6)}>TH6</button>
                <button onClick={() => handleTownhallButtonClick(7)}>TH7</button>
                <button onClick={() => handleTownhallButtonClick(8)}>TH8</button>
            </div>
            {buildingDiv}
        </div>
    )
}

export default SelectTownhall
