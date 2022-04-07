import LandFilter from './LandFilter'
import LandView from './LandView'
import style from './landAuction.module.css'
import { useEffect, useState, useCallback } from 'react';
import { Grid, GridItem } from '@chakra-ui/react'

type Owner = {
    name: string,
    walletAddress: string,
}

type Land = {
    id: number,
    name: string,
    region: number,
    status: number,
    level: number,
    price: number,
    owner: Owner,
}

type Props = {
    action: number,
    isOpen: boolean,
    toggleLandAuction: () => void,
}

const lands: Array<Land> = [
    {
        id: 1,
        name: 'Land 1',
        region: 0,
        level: 1,
        status: 1, // 0: for sale, 1: not for sale, 2: vacant
        price: 0,
        owner: {
            name: 'User 1',
            walletAddress: '0x000000000000000000000000000000000001',
        }
    },
    {
        id: 2,
        name: 'Land 2',
        region: 0,
        level: 1,
        status: 1,
        price: 0,
        owner: {
            name: 'User 2',
            walletAddress: '0x000000000000000000000000000000000002',
        }
    },
    {
        id: 3,
        name: 'Land 3',
        region: 1,
        level: 1,
        status: 0,
        price: 300000,
        owner: {
            name: 'User 3',
            walletAddress: '0x000000000000000000000000000000000003',
        }
    },
    {
        id: 4,
        name: 'Land 4',
        region: 1,
        level: 1,
        status: 0,
        price: 400000,
        owner: {
            name: 'User 4',
            walletAddress: '0x000000000000000000000000000000000004',
        }
    },
    {
        id: 5,
        name: 'Land 5',
        region: 2,
        level: 1,
        status: 1,
        price: 0,
        owner: {
            name: 'User 5',
            walletAddress: '0x000000000000000000000000000000000005',
        }
    },
  ]


export default function LandAuction(props: Props) {
    const {
        action,
        isOpen,
        toggleLandAuction
    } = props;

    const [filterSearchId, setFilterSearchId] = useState("");
    const [filterRegions, setFilterRegions] = useState([]);
    const [filterStatus, setFilterStatus] = useState(-1);
    const [filteredLands, setFilteredLands] = useState(lands);

    const filterLands = useCallback(() => {
        let tempFilteredLands = [...lands];

        if (action === 1)  {
            tempFilteredLands = tempFilteredLands.filter(land => land.status === 0)
        }

        if (filterSearchId !== '') {
            tempFilteredLands = tempFilteredLands.filter(land => land.id === parseInt(filterSearchId, 10))
        }

        if (filterStatus !== -1) {
            tempFilteredLands = tempFilteredLands.filter(land => land.status === filterStatus)
        }

        if (filterRegions.length !== 0) {
            let temp = [];
            filterRegions.forEach(region => {
                temp = [...temp, ...tempFilteredLands.filter(land => land.region === region)]
            })

            tempFilteredLands = [...temp];
        }

        return tempFilteredLands;
    }, [filteredLands])

    const updateFilterStatus = useCallback((selectedStatus) => {
        setFilterStatus(selectedStatus)
    }, [])

    const updateFilterRegions = useCallback((selectedFilterRegions) => {
        setFilterRegions(selectedFilterRegions)
    }, [])

    const updateFilterSearchId = useCallback((selectedFilterId) => {
        setFilterSearchId(selectedFilterId)
    }, [])

    const applyFilter = useCallback(() => {
        setFilteredLands(filterLands());
    }, [])

    useEffect(() => {
        filterLands()
    }, [])


    return (
        <Grid
            className={`${style.landAuction} overlay ${isOpen ? style.active : ''}`}
            templateColumns={{'base': 'repeat(2, 1fr)', 'md': 'repeat(6, 1fr)'}}
            gap={{'base': 0, 'md': 5}}
        >
            <GridItem
                colSpan={{'base': 2, 'md': 3, 'xl': 2}}
                h="fit-content"
            >
                {/* Filter */}
                <LandFilter
                    selectedStatus={filterStatus}
                    selectedRegions={filterRegions}
                    updateFilterStatus={(selectedStatus) => updateFilterStatus(selectedStatus)}
                    updateFilterRegions={(selectedFilterRegions) => updateFilterRegions(selectedFilterRegions)}
                    updateFilterSearchId={(selectedFilterId) => updateFilterSearchId(selectedFilterId)}
                    applyFilter={applyFilter}
                />
            </GridItem>

            <GridItem colSpan={{'base': 2, 'md': 3 ,'xl': 4}} minH="100%" >
                {/* Land display */}
                <LandView
                    closeLandAuction={toggleLandAuction}
                    action={action}
                    lands={filterLands()}
                />
            </GridItem>
        </Grid>
    )
}