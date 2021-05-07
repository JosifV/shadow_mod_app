import { useEffect, useState } from "react"
import { Card, vetoAny } from "../types";
import { parseCards } from "../utils"
import { logicCriterion as logic } from "../const";

import Dialog from '@material-ui/core/Dialog';
import { AppBar, Toolbar, IconButton, TextField, Typography, Theme, createStyles, makeStyles } from "@material-ui/core";

//@ts-ignore
import CloseIcon from '@material-ui/icons/Close';
import { API } from "../service";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        title: {
            flexGrow: 1,
        },
        hide: {
            display: 'none',
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    }),
);
export const Main: React.FC = () => {
    let [originalcards, setOriginalCards] = useState<Card[]>([])
    let [filteredCards, setFilteredCards] = useState<Card[]>([])

    useEffect(() => {
        (async () => {
            let apiInstance = new API()
            let { data } = await apiInstance.fetchData()
            setOriginalCards(parseCards(data))
            setFilteredCards(parseCards(data))
            setCardTextArr(parseCards(data).map(x => `${x.title.toLowerCase()} | ${x.context.toLowerCase()} | ${x.tags.map(t => t.replace('#', '').toLowerCase()).join(' ')}`))
            setOpenPopup(parseCards(data).map(x => x.opened))
        })()
    }, [])

    let [currCard, setCurrCard] = useState<number>(-1)

    const classes = useStyles();
    let [cardTextArr, setCardTextArr] = useState<string[]>([])

    let [seconds, setSeconds] = useState<number>(0);
    let [startTime, setStartTime] = useState<number>(0);
    let [over, setOver] = useState<boolean>(false);

    let [openPopup, setOpenPopup] = useState<boolean[]>([])

    let [clickCard, setClickCard] = useState<Partial<Card>>({})

    //* HOVER INTERVAL
    let startHoverCount = (index: number) => {
        setCurrCard(index) //* set the curr card var
        setStartTime(new Date().getTime()) //* in ms
    }

    let endHoverCount = () => {
        let timeDiff = Math.abs(new Date().getTime() - startTime);
        //* strip the ms
        timeDiff /= 1000;

        //* calc seconds
        setSeconds(Math.round(timeDiff % 60))
        setOver(!over)
    }

    useEffect(() => {
        if (seconds >= logic.hoverShadowSeconds) {
            console.log(`seconds ::: ${seconds}`);
            console.log('#######');
            (async () => {
                let apiInstance = new API()
                let {data} = await apiInstance.updateHover({
                    id:filteredCards[currCard].id,
                    val:seconds
                })
            })()
            setSeconds(0)
            setStartTime(0)
        }
    }, [over])
    //*

    //* OPEN POPUP
    let popupHandler = (card: Card, index: number, context: boolean) => {
        setClickCard(card)

        let newOpenPopup = openPopup.map((y, yIndex) => yIndex === index ? context : y)

        //* if else to avoid event bubling
        if (context) setOpenPopup(newOpenPopup)
        else setTimeout(() => setOpenPopup(newOpenPopup), 0);
    }

    useEffect(() => {
        if(filteredCards.length){
            (async () => {
                let apiInstance = new API()
                let {data} = await apiInstance.updateClick({
                    id:filteredCards[currCard].id
                })
            })()
        }
    }, [clickCard])
    //*

    //* SEARCH ENTRY
    let search = (args: string) => {
        if (args.length === 0) {
            setOpenPopup(originalcards.map(c => c.opened))
            setFilteredCards(originalcards)
        }
        if (args.length > 3) {
            let arrToPush: Card[] = []
            for (let num = 0; num < cardTextArr.length; num++) {
                for (const arg of args.split(' ').filter(a => a !== '' && a !== ' ')) {
                    if (cardTextArr[num].includes(arg.toLowerCase())) arrToPush.push(originalcards[num])
                }
            }
            setFilteredCards(arrToPush)
            setOpenPopup(arrToPush.map(c => c.opened))
        }
    }

    let filterShadow = async (value: string) => {
        console.log(value);
        let res = await 'filter api call'
        //todo
    }
    //*

    return <div>
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" noWrap className={classes.title}> Power_App 2000X </Typography>
                <div className="inputSearch">
                    <TextField onBlur={(event: vetoAny) => filterShadow(event.target.value)} onKeyUp={(event: vetoAny) => search(event.target.value)} margin="dense" size="medium" variant="filled" label="Search" />
                </div>
            </Toolbar>
        </AppBar>

        <div className="mainCont" >
            {filteredCards.map((x, xIndex) => <div onMouseEnter={() => startHoverCount(xIndex)} onMouseLeave={endHoverCount} onClick={() => popupHandler(x, xIndex, true)} className={x.context.concat(' cardMain')} key={xIndex}>
            <h4 style={{ marginTop: 0 }}>{x.title}</h4>
            <p style={{ marginTop: 0 }}>{x.context}</p>
            <p className="cardDesc">{x.tags.join(' ')}</p>
            {openPopup.length ? <Dialog open={openPopup[xIndex]} onBackdropClick={() => popupHandler(x, xIndex, false)}>
                <IconButton aria-label="close" className={classes.closeButton} onClick={() => popupHandler(x, xIndex, false)}>
                    <CloseIcon />
                </IconButton>
                <div className="popupCont">
                    <h4><strong>Title: </strong>{x.title}</h4>
                    <hr />
                    <p style={{ marginTop: 0 }}><strong>Context: </strong>{x.context}</p>
                    <hr />
                    <strong>Tags: </strong>
                    {x.tags.map((t, tIndex) => <p key={`tag_${tIndex}`} className="tags">{t}</p>)}
                </div>
            </Dialog> : null}
        </div>)}
        </div>
    </div>
}