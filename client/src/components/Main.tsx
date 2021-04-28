import { useEffect, useRef, useState } from "react"
import { Card, vetoAny } from "../types";
import { makingCards } from "../utils"
import { useInterval } from 'react-interval-hook';
import { logicCriterion as logic } from "../const";

import Dialog from '@material-ui/core/Dialog';
import { AppBar, Toolbar, IconButton, TextField, Typography, Theme, createStyles, makeStyles } from "@material-ui/core";

//@ts-ignore
import CloseIcon from '@material-ui/icons/Close';

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
    let [originalcards] = useState<Card[]>(makingCards(150))
    let [filteredCards, setFilteredCards] = useState<Card[]>([...originalcards])

    let [currCard, setCurrCard] = useState<number>(-1)

    const classes = useStyles();
    let [cardTextArr] = useState<string[]>(originalcards.map(x => `${x.title.toLowerCase()} | ${x.context.toLowerCase()} | ${x.tags.map(t => t.replace('#', '').toLowerCase()).join(' ')}`))

    let [hover, setHover] = useState<number>(0);
    let [openPopup, setOpenPopup] = useState<boolean[]>(originalcards.map(x => x.opened))

    let [clickCard, setClickCard] = useState<Partial<Card>>({})

    //* HOVER INTERVAL
    let { start, stop } = useInterval(
        () => setHover(hover++),
        1000,
        {
            // autoStart: false,
            // immediate: false,
            // selfCorrecting: false,
            onFinish: () => setHover(0),
        }
    )
    let startHoverCount = (index: number) => {
        setCurrCard(index) //* set the curr card var
        start()
    }

    let endHoverCount = () => stop();

    useEffect(() => {
        if (hover >= logic.hoverShadowSeconds) {
            console.log(`hover ::: ${hover}`);
            console.log('#######');
            (async () => {
                let res = await 'someApiFuncCall'
                //todo
            })()
        }
    }, [hover])
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
        (async () => {
            let res = await 'someApiFuncCall'
            //todo
        })()
    }, [clickCard])
    //*

    //* SEARCH ENTRY
    let search = (args: string) => {
        if (args.length === 0) setFilteredCards(originalcards)
        if (args.length > 3) {
            let arrToPush: Card[] = []
            for (let num = 0; num < cardTextArr.length; num++) {
                for (const arg of args.split(' ').filter(a => a !== '' && a !== ' ')) {
                    if (cardTextArr[num].includes(arg.toLowerCase())) arrToPush.push(originalcards[num])
                }
            }
            setFilteredCards(arrToPush)
            setOpenPopup(arrToPush.map(c=> c.opened))
        }
    }

    let filterShadow = async (value: string) => {
        console.log(value);
        let res = await 'someApiFuncCall'
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

        <div className="mainCont">
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