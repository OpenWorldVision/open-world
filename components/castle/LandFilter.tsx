
import { useState, useRef, useEffect, useCallback } from 'react';
import style from './landFilter.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faCaretDown, faCaretUp, faSlidersH } from '@fortawesome/free-solid-svg-icons'
import { Grid, GridItem } from '@chakra-ui/react'

const filterStatus = ['All', 'For Sale', 'Not for sale', 'Vacant']

const filterRegion = [
    'All',
    'Adelyn',
    'Adelyn Highlands',
    'Amber Town',
    'Amoriath\'s Domain',
    'Breakwater Island',
    'Dornielle Abbey',
    'Esterfork',
    'Fairling Forest',
    'Gaeron\'s Wood',
    'Haywoord',
    'Illyria\'s Rest',
    'Lake of Knives',
    'Old King\'s Barrow',
    'Riverhold',
    'Stefan\'s Lake',
    'Stillwood Meadow'
];

const initialRegionState = () => {
    const defaultCheckboxArr = new Array(filterRegion.length - 1).fill(false);
    defaultCheckboxArr.unshift(true);
    return defaultCheckboxArr;
}

type Props = {
    selectedStatus: number,
    selectedRegions: Array<number>,
    updateFilterRegions: (selectedRegion: Array<number>) => void,
    updateFilterStatus: (selectedStatus: number) => void,
    updateFilterSearchId: (searchId: string) => void,
    applyFilter: () => void,
}

export default function LandFilter(props: Props) {
    const {
        selectedRegions,
        selectedStatus,
        updateFilterRegions,
        updateFilterStatus,
        updateFilterSearchId,
        applyFilter,
    } = props;

    const [isExpanded, setIsExpanded] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [checkedState, setCheckedState] = useState(initialRegionState());
    const landSearchId = useRef<HTMLInputElement>();

    useEffect(() => {
        const checkWindowWidth = () => {
            if (window.innerWidth < 740) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        }

        checkWindowWidth();

        window.addEventListener('resize', checkWindowWidth);

        return () => {
            window.removeEventListener('resize', checkWindowWidth);
        }
    }, []);

    const expandFilter = useCallback(() => {
        setIsExpanded(!isExpanded);
    }, [isExpanded])

    const checkFilterRegion = useCallback((e, position) => {
        let updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        if (position === 0) {
            if (e.target.checked) {
                updatedCheckedState = initialRegionState()
                setCheckedState(updatedCheckedState);
            }
        } else {
            const isUncheckedAll = updatedCheckedState.indexOf(true);

            if (!e.target.checked && isUncheckedAll === -1) {
                updatedCheckedState = initialRegionState()
                setCheckedState(updatedCheckedState);
            } else {
                updatedCheckedState.shift();
                updatedCheckedState.unshift(false);
                setCheckedState(updatedCheckedState);
            }
        }
        const tempSelectedRegions = [];
        updatedCheckedState.forEach((regionState, index) => {
            if (regionState && index !== 0) {
                tempSelectedRegions.push(index-1);
            }
        })

        updateFilterRegions(tempSelectedRegions)
    }, [selectedRegions])

    const checkFilterStatus = useCallback((e) => {
        if (e.target.checked) {
            updateFilterStatus(parseInt(e.target.value, 10));
        }
    }, [selectedStatus])

    const onApplyFilter = useCallback(() => {
       applyFilter();

        if (window.innerWidth < 376) {
            expandFilter();
        }
    }, [])

    const resetFilter = useCallback(() => {
        const region1: HTMLElement = document.querySelector('#region--1');
        const status1: HTMLElement = document.querySelector('#status--1');

        region1.click();
        status1.click();

        landSearchId.current.value = "";
        onApplyFilter();
    }, [])

    return (
        <div className={`${style.filter} ${!isExpanded ? '' : style.active}`}>
        {(isMobile || isExpanded) &&
            <div className={`${style.filterExpanded} game-border basic`}>
                {/* Header */}
                <div className={style.filterHeader}>
                    <div className={style.filterHeaderGroup}>
                        <span>Filter</span>
                        <div
                            className={`${style.filterToggleBtn} click-cursor`}
                            onClick={expandFilter}
                        >
                            {!isMobile && <FontAwesomeIcon icon={faAngleLeft} />}
                            {isMobile && !isExpanded && <FontAwesomeIcon icon={faCaretDown} />}
                            {isMobile && isExpanded && <FontAwesomeIcon icon={faCaretUp} />}
                        </div>
                    </div>
                    {isExpanded &&
                        <div className={style.filterHeaderGroup}>
                            <button
                                className={`green-button click-cursor ${style.filterBtn}`}
                                onClick={onApplyFilter}
                            >
                                Apply
                            </button>

                            <button
                                className={`green-button click-cursor ${style.filterBtn}`}
                                onClick={resetFilter}
                            >
                                Reset
                            </button>
                        </div>
                    }
                </div>
                <hr></hr>

                {/* Body */}
                {isExpanded &&
                    <div
                        className={`${style.filterBody} game-scroll-bar`}
                    >
                        {/* Search */}
                        <div className={style.filterSearch}>
                            <input
                                ref={landSearchId}
                                type="text"
                                className={style.filterSearchInput}
                                placeholder="Search by Land ID"
                                onChange={() => updateFilterSearchId(landSearchId.current.value)}
                            />
                        </div>

                        {/* Status */}
                        <div className="filter-status">
                            <span className={style.filterHeading}>Status</span>
                            <div className="container">
                                <Grid
                                    className="filter-status__list"
                                    templateColumns='repeat(2, 1fr)'
                                >
                                    { filterStatus.map((status, index) =>
                                        <GridItem
                                            className={style.filterStatusItem}
                                            colSpan={1}
                                            key={status}
                                        >
                                            <label
                                                className={`${style.statusLabel} click-cursor`}
                                                htmlFor={`status-${index -1}`}
                                            >
                                                <input
                                                    className="click-cursor"
                                                    type="radio"
                                                    name="status"
                                                    value={index - 1}
                                                    id={`status-${index - 1}`}
                                                    defaultChecked={index === 0}
                                                    onChange={(e) => checkFilterStatus(e)}
                                                />
                                                <span>{ status }</span>
                                            </label>
                                        </GridItem>
                                    )}
                                </Grid>
                            </div>
                        </div>

                        {/* Region */}
                        <div className="filter-region">
                            <span className={style.filterHeading}>Region</span>
                            <div className="container">
                                <Grid
                                    className="filter-region__list"
                                    templateColumns='repeat(2, 1fr)'
                                >
                                    { filterRegion.map((region, index) =>
                                        <GridItem
                                            className={style.filterRegionItem}
                                            colSpan={1}
                                            key={region}
                                        >
                                            <label
                                                className={`${style.regionLabel} click-cursor`}
                                                htmlFor={`region-${index - 1}`}
                                            >
                                                <input
                                                    className="click-cursor"
                                                    type="checkbox"
                                                    name="regions"
                                                    id={`region-${index - 1}`}
                                                    checked={checkedState[index]}
                                                    value={index - 1}
                                                    onChange={(e) => checkFilterRegion(e, index)}
                                                />
                                                <span>{ region }</span>
                                            </label>
                                        </GridItem>
                                    )}
                                </Grid>
                            </div>
                        </div>
                    </div>
                }

            </div>
        }
        {!isExpanded && !isMobile &&
            <div className={`${style.filterShrink} game-border basic`}>
                <div
                    className={`${style.filterExpandBtn} click-cursor`}
                    onClick={expandFilter}
                >
                    <FontAwesomeIcon icon={faSlidersH} />
                </div>
            </div>
        }
        </div>
    )
}
