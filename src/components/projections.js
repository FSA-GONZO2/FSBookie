import React, { useEffect, useState } from 'react';
// import { useGetMLBQuery, useGetNFLQuery } from '../src/redux/slices/apiSlice';
import { useGetActiveBetsQuery } from '../../src/redux/slices/apiSlice';
import styled from 'styled-components';
import Link from 'next/link';
import ProgressBar from '../../src/components/ProgressBar';
import { NBAlogos, NHLlogos, MLBlogos, NFLlogos } from '../../public/teamLogos';

const SportsContainer = styled.div`
	width: 100%;
	max-width: 100%;
	height: 100%;
	background-color: black;
	padding: 3%;
`;
const SportsHeader = styled.div`
	margin-bottom: 15%;
	height: 100%;
	color: white;
	background: black;
	position: relative;
	display: flex;
	gap: 1%;
	a {
		position: relative;
		text-decoration: none;
		box-sizing: border-box;
		padding: 2% 4.25%;
		border: 1px solid #242424;
		border-radius: 50px;
		color: #ababab;
		background-color: #000;
		white-space: nowrap;
		font-size: 0.625em;
		line-height: 14px;
		font-weight: 600;
		font-family: 'Saira Condensed', sans-serif;
		text-transform: uppercase;
		cursor: pointer;
		transition: all 0.16s ease;
	}
`;
const GamesContainer = styled.div``;
const Games = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	table-layout: fixed;
	border-collapse: separate;
	border-spacing: 0;
	padding: 8px;
	background-color: #121212;

	.alwaysleft {
		width: 40%;
		font-weight: 600;
		text-align: left;
	}
`;
const GameCard = styled.div`
	color: white;
	border-top: 0.25em solid #242424;

	.eventCellLink {
		width: 100%;
		position: relative;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		flex-direction: column;
		padding-left: 10px;
		text-decoration: none;
	}
	.gametitle {
		display: flex;
		align-items: center;
		text-align: unset;
	}
	.eventCell {
		width: 100%;
		position: relative;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		flex-direction: column;
		padding-left: 10px;
		text-decoration: none;
	}

	.team1 {
		font-size: 1.2em;
		color: white;
		margin-left: 10px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		max-width: 100px;
	}
	@media only screen and (min-width: 850px) {
		.team1 {
			text-overflow: none;
			max-width: 100%;
		}
	}
	.gameTime {
		font-size: 0.25em;
	}

	.teamInfo {
		margin-top: 0.5em;
		display: flex;
		overflow: hidden;
	}
	.imgContainer {
		img {
			height: 18px;
		}
	}

	.line {
		color: white;
	}

	.lineodds {
		color: #00aa38;
	}

	.lineContainer {
		display: flex;
		padding: 2%;
		margin: 1px;
		display: flex;
		justify-content: center;
		text-align: center;
		flex-direction: column;
		gap: 0.5em;
		background-color: #242424;
		height: 48px;
		color: white;
	}
`;

const TableRow = styled.div`
	display: flex;
	flex-direction: row;
	/* justify-content: space-between; */
	.gameInfo {
		/* border-top: 0.25em solid #242424; */
		/* padding-top: 4%; */
		/* flex-grow: 2; */
		width: 150%;
	}
	.game2Info {
		/* padding-top: 4%; */
		/* flex-grow: 2; */
		width: 150%;
	}
	.lineCol {
		/* border-top: 0.25em solid #242424; */
		/* padding-top: 6%; */
		font-size: 0.7em;
		box-sizing: border-box;
		height: 100%;
		width: 100%;
		position: relative;
		/* flex-grow: 1; */
	}

	.line2Col {
		font-size: 0.7em;
		box-sizing: border-box;
		height: 100%;
		width: 100%;
		position: relative;
	}
`;

const GamesHeader = styled.div`
	display: flex;
	justify-content: space-between;
	cursor: default;
	color: #c5c5c5;
	font-size: 0.7em;
	border-bottom: 0.25em solid #242424;
`;

const Space = styled.div`
	height: 25%;
	color: white;
`;

const Projections = ({ games, sport }) => {
	// const { data: NFLGames, error, isLoading, isSuccess, isFetching } = useGetNFLQuery();
	const { data: activeGames, isLoading: betsLoading } =
		useGetActiveBetsQuery();
	console.log(activeGames);
	let bets = {};
	activeGames?.length &&
		activeGames.forEach((bet) => {
			if (Object.keys(bets).includes(bet.betId)) {
				if (
					!Object.keys(bets[bet.betId]).includes(
						bet.teamToWin + ' ' + bet.betType
					)
				) {
					bets[bet.betId][bet.teamToWin + ' ' + bet.betType] = 1;
				} else {
					bets[bet.betId][bet.teamToWin + ' ' + bet.betType] += 1;
				}
			} else {
				bets[bet.betId] = { [bet.teamToWin + ' ' + bet.betType]: 1 };
			}
		});
	console.log(bets);
	console.log('GAMES', games);

	// 	let newGames = [];

	// 	if (games) {
	// 		// games.forEach(game => newGames.push(game));
	// 		newGames = games.map((game, idx) => ({
	// 			...game,
	// 			betType: activeGames.filter(gamee => gamee.betId == game.ID)[0]?.betType
	// 	})
	// 	);
	// }
	// 	console.log(newGames);

	return (
		<div>
			{/* <Space>
				<p>fgsdagasdgds</p>
				<p>fgsdagasdgds</p>
				<p>fgsdagasdgds</p>
				<p>fgsdagasdgds</p>
				<p>fgsdagasdgds</p>
			</Space> */}
			<SportsContainer>
				<SportsHeader>
					<Link href='/projections/NFL'>
						<a>Football</a>
					</Link>
					<Link href='/projections/NBA'>
						<a>Basketball</a>
					</Link>
					<Link href='/projections/NHL'>
						<a>Hockey</a>
					</Link>
					<Link href='/projections/MLB'>
						<a>Baseball</a>
					</Link>
				</SportsHeader>
				<GamesContainer>
					<Games>
						<GamesHeader>
							<p className='alwaysleft gamelines'>TODAY</p>
							<p className='gamelines'>SPREAD</p>
							<p className='gamelines'>TOTAL</p>
							<p className='gamelines'>MONEYLINE</p>
						</GamesHeader>
						{games &&
							games
								.filter((game) =>
									Object.keys(bets).includes(game.ID)
								)
								.map((game, idx) => {
									let d = new Date(
										game.MatchTime
									).toDateString();
									let t = new Date(
										game.MatchTime
									).toLocaleTimeString('en-US');
									// MUST FIX THE TIME
									let time = d + ' ' + t;
									let apiId = game.ID;


									let homeTeamLogo;
									let awayTeamLogo;
									if (sport === 'NBA') {
										awayTeamLogo = NBAlogos.filter(
											(name) => name.team === game.AwayTeam
										)[0]?.logo;
										homeTeamLogo = NBAlogos.filter(
											(name) => name.team === game.HomeTeam
										)[0]?.logo;
									}
									if (sport === 'NFL') {
										awayTeamLogo = NFLlogos.filter(
											(name) => name.team === game.AwayTeam
										)[0]?.logo;
										homeTeamLogo = NFLlogos.filter(
											(name) => name.team === game.HomeTeam
										)[0]?.logo;
									}
									if (sport === 'MLB') {
										awayTeamLogo = MLBlogos.filter(
											(name) => name.team === game.AwayTeam
										)[0]?.logo;
										homeTeamLogo = MLBlogos.filter(
											(name) => name.team === game.HomeTeam
										)[0]?.logo;
									}
									if (sport === 'NHL') {
										awayTeamLogo = NHLlogos.filter(
											(name) => name.team === game.AwayTeam
										)[0]?.logo;
										homeTeamLogo = NHLlogos.filter(
											(name) => name.team === game.HomeTeam
										)[0]?.logo;
									}

									// console.log(apiId);
									return (
										<GameCard key={idx}>
											<TableRow>
												<div className='gameInfo'>
													{/* <div className='eventCell'> */}
													<span className='gameTime'>
														{time}
													</span>
													<div className='teamInfo'>
														<div className='imgContainer'>
															<img src={awayTeamLogo} />
														</div>
														<div className='team1'>
															{game.AwayTeam}
														</div>
													</div>
													{/* </div> */}
												</div>
												{/* AWAY TEAM SPREAD!!!!!!!!!!! */}
												<div className='lineCol'>
													{game.Odds[0]
														.PointSpreadAway == 0 ||
													game.Odds[0]
														.PointSpreadAway ==
														0.0 ? (
														<div className='lineContainer'>
															N/A
														</div>
													) : (
														<div className='lineContainer'>
															{/* <div className='line'>
													{game.Odds[0]
														.PointSpreadAway[0] ===
													'-'
														? game.Odds[0]
																.PointSpreadAway
														: '+' +
														  game.Odds[0]
																.PointSpreadAway}
												</div>
												<div className='lineodds'>
													{game.Odds[0]
														.PointSpreadAwayLine[0] ===
													'-'
														? game.Odds[0]
																.PointSpreadAwayLine
														: '+' +
														  game.Odds[0]
																.PointSpreadAwayLine}
												</div> */}
															{/* <div className='lineTrend'>
													{typeof (bets[apiId]) !== 'undefined' && (typeof (bets[apiId][game.AwayTeam + " " + game.Odds[0].PointSpreadAway]) !== 'undefined' ? typeof (bets[apiId][game.HomeTeam + " " + game.Odds[0].PointSpreadHome]) !== 'undefined' ? `${(bets[apiId][game.AwayTeam + " " + game.Odds[0].PointSpreadAway] / (bets[apiId][game.AwayTeam + " " + game.Odds[0].PointSpreadAway] + bets[apiId][game.HomeTeam + " ML"]) * 100)}%` : `${100}%` : `${0}%`)}
												</div> */}
															{/* {typeof (bets[apiId]) !== 'undefined' && (typeof (bets[apiId][game.AwayTeam + " " + game.Odds[0].PointSpreadAway]) !== 'undefined' ? typeof (bets[apiId][game.HomeTeam + " " + game.Odds[0].PointSpreadHome]) !== 'undefined' ? <ProgressBar completed={`${(bets[apiId][game.AwayTeam + " " + game.Odds[0].PointSpreadAway] / (bets[apiId][game.AwayTeam + " " + game.Odds[0].PointSpreadAway] + bets[apiId][game.HomeTeam + " " + game.Odds[0].PointSpreadHome]) * 100)}`} /> : <ProgressBar completed={`${100}`} /> : <ProgressBar completed={`${0}`} />)} */}
															{/* {console.log(game, bets[apiId]['AwayTeam ' + game.betType])} */}
															{/* {console.log(game)} */}
															{console.log(bets)}
															{typeof bets[
																apiId
															] !== 'undefined' &&
																(typeof bets[
																	apiId
																][
																	'AwayTeam spread'
																] !==
																'undefined' ? (
																	typeof bets[
																		apiId
																	][
																		'HomeTeam spread'
																	] !==
																	'undefined' ? (
																		<ProgressBar
																			completed={
																				((bets[
																					apiId
																				][
																					'AwayTeam spread'
																				] /
																					(bets[
																						apiId
																					][
																						'AwayTeam spread'
																					] +
																						bets[
																							apiId
																						][
																							'HomeTeam spread'
																						])) *
																				100).toFixed(2)
																			}
																		/>
																	) : (
																		<ProgressBar
																			completed={100}
																		/>
																	)
																) : (
																	<ProgressBar
																		completed={`${0}`}
																	/>
																))}
														</div>
													)}
												</div>
												{/* OVER!!!!!!!!!!! */}
												<div className='lineCol'>
													{game.Odds[0]
														.PointSpreadAway == 0 ||
													game.Odds[0]
														.PointSpreadAway ==
														0.0 ? (
														<div className='lineContainer'>
															N/A
														</div>
													) : (
														<div className='lineContainer'>
															{/* <div className='line'>
													O {game.Odds[0].TotalNumber}
												</div>
												<div className='lineodds'>
													{game.Odds[0]
														.OverLine[0] === '-'
														? game.Odds[0].OverLine
														: '+' +
														  game.Odds[0].OverLine}
												</div> */}
															{typeof bets[
																apiId
															] !== 'undefined' &&
																(typeof bets[
																	apiId
																][
																	'AwayTeam total'
																] !==
																'undefined' ? (
																	typeof bets[
																		apiId
																	][
																		'HomeTeam total'
																	] !==
																	'undefined' ? (
																		<ProgressBar
																			completed={`${
																				((bets[
																					apiId
																				][
																					'AwayTeam total'
																				] /
																					(bets[
																						apiId
																					][
																						'AwayTeam total'
																					] +
																						bets[
																							apiId
																						][
																							'HomeTeam total'
																						])) *
																				100).toFixed(2)
																			}`}
																		/>
																	) : (
																		<ProgressBar
																			completed={100}
																		/>
																	)
																) : (
																	<ProgressBar
																		completed={0}
																	/>
																))}
														</div>
													)}
												</div>
												{/* AWAY TEAM!!!!!!!!!!! */}
												<div className='lineCol'>
													{game.Odds[0]
														.PointSpreadAway == 0 ||
													game.Odds[0]
														.PointSpreadAway ==
														0.0 ? (
														<div className='lineContainer'>
															N/A
														</div>
													) : (
														<div className='lineContainer'>
															{/* <div className='lineodds'>
													{' '}
													{game.Odds[0]
														.MoneyLineAway[0] ===
													'-'
														? game.Odds[0]
																.MoneyLineAway
														: '+' +
														  game.Odds[0]
																.MoneyLineAway}
												</div> */}
															{/* <div className='lineTrend'>
													{typeof (bets[apiId]) !== 'undefined' && (typeof (bets[apiId][game.AwayTeam + " ML"]) !== 'undefined' ? typeof (bets[apiId][game.HomeTeam + " ML"]) !== 'undefined' ? `${(bets[apiId][game.AwayTeam + " ML"] / (bets[apiId][game.AwayTeam + " ML"] + bets[apiId][game.HomeTeam + " ML"]) * 100)}%` : `${100}%` : `${0}%`)}
												</div> */}
															{typeof bets[
																apiId
															] !== 'undefined' &&
																(typeof bets[
																	apiId
																][
																	'AwayTeam ML'
																] !==
																'undefined' ? (
																	typeof bets[
																		apiId
																	][
																		'HomeTeam ML'
																	] !==
																	'undefined' ? (
																		<ProgressBar
																			completed={`${
																				((bets[
																					apiId
																				][
																					'AwayTeam ML'
																				] /
																					(bets[
																						apiId
																					][
																						'AwayTeam ML'
																					] +
																						bets[
																							apiId
																						][
																							'HomeTeam ML'
																						])) *
																				100).toFixed(2)
																			}`}
																		/>
																	) : (
																		<ProgressBar
																			completed={`${100}`}
																		/>
																	)
																) : (
																	<ProgressBar
																		completed={`${0}`}
																	/>
																))}
														</div>
													)}
												</div>
											</TableRow>
											<TableRow>
												<div className='game2Info'>
													{/* <div className='eventCell'> */}
													<div className='gameStatus'></div>
													<div className='teamInfo'>
														<div className='imgContainer'>
															<img src={homeTeamLogo} />
														</div>
														<a className='team1'>
															{game.HomeTeam}
														</a>
													</div>
													{/* </div> */}
												</div>
												{/* HOME TEAM SPREAD!!!!!!!!!!! */}
												<div className='line2Col'>
													{game.Odds[0]
														.PointSpreadAway == 0 ||
													game.Odds[0]
														.PointSpreadAway ==
														0.0 ? (
														<div className='lineContainer'>
															NA
														</div>
													) : (
														<div className='lineContainer'>
															{/* <div className='line'>
													{game.Odds[0]
														.PointSpreadHome[0] ===
													'-'
														? game.Odds[0]
																.PointSpreadHome
														: '+' +
														  game.Odds[0]
																.PointSpreadHome}
												</div>
												<div className='lineodds'>
													{game.Odds[0]
														.PointSpreadHomeLine[0] ===
													'-'
														? game.Odds[0]
																.PointSpreadHomeLine
														: '+' +
														  game.Odds[0]
																.PointSpreadHomeLine}
												</div> */}
															{/* {typeof (bets[apiId]) !== 'undefined' && (typeof (bets[apiId][game.HomeTeam + " " + game.Odds.filter(odd => odd.OddType === 'Game')[0].PointSpreadHome]) !== 'undefined' ? typeof (bets[apiId][game.AwayTeam + " " + game.Odds.filter(odd => odd.OddType === 'Game')[0].PointSpreadAway]) !== 'undefined' ? <ProgressBar completed={`${(bets[apiId][game.HomeTeam + " " + game.Odds.filter(odd => odd.OddType === 'Game')[0].PointSpreadHome] / (bets[apiId][game.HomeTeam + " " + game.Odds.filter(odd => odd.OddType === 'Game')[0].PointSpreadHome] + bets[apiId][game.AwayTeam + " " + game.Odds.filter(odd => odd.OddType === 'Game')[0].PointSpreadAway]) * 100)}`} /> : <ProgressBar completed={`${100}`} /> : <ProgressBar completed={`${0}`} />)} */}
															{typeof bets[
																apiId
															] !== 'undefined' &&
																(typeof bets[
																	apiId
																][
																	'HomeTeam spread'
																] !==
																'undefined' ? (
																	typeof bets[
																		apiId
																	][
																		'AwayTeam spread'
																	] !==
																	'undefined' ? (
																		<ProgressBar
																			completed={`${
																				((bets[
																					apiId
																				][
																					'HomeTeam spread'
																				] /
																					(bets[
																						apiId
																					][
																						'HomeTeam spread'
																					] +
																						bets[
																							apiId
																						][
																							'AwayTeam spread'
																						])) *
																				100).toFixed(2)
																			}`}
																		/>
																	) : (
																		<ProgressBar
																			completed={`${100}`}
																		/>
																	)
																) : (
																	<ProgressBar
																		completed={`${0}`}
																	/>
																))}
														</div>
													)}
												</div>
												{/* UNDER!!!!!!!!!!! */}
												<div className='line2Col'>
													{game.Odds[0]
														.PointSpreadAway == 0 ||
													game.Odds[0]
														.PointSpreadAway ==
														0.0 ? (
														<div className='lineContainer'>
															N/A
														</div>
													) : (
														<div className='lineContainer'>
															{/* <div className='line'>
													U {game.Odds[0].TotalNumber}
												</div>
												<div className='lineodds'>
													{game.Odds[0]
														.UnderLine[0] === '-'
														? game.Odds[0].UnderLine
														: '+' +
														  game.Odds[0]
																.UnderLine}
												</div> */}
															{typeof bets[
																apiId
															] !== 'undefined' &&
																(typeof bets[
																	apiId
																][
																	'HomeTeam total'
																] !==
																'undefined' ? (
																	typeof bets[
																		apiId
																	][
																		'AwayTeam total'
																	] !==
																	'undefined' ? (
																		<ProgressBar
																			completed={`${
																				((bets[
																					apiId
																				][
																					'HomeTeam total'
																				] /
																					(bets[
																						apiId
																					][
																						'HomeTeam total'
																					] +
																						bets[
																							apiId
																						][
																							'AwayTeam total'
																						])) *
																				100).toFixed(2)
																			}`}
																		/>
																	) : (
																		<ProgressBar
																			completed={`${100}`}
																		/>
																	)
																) : (
																	<ProgressBar
																		completed={`${0}`}
																	/>
																))}
														</div>
													)}
												</div>
												{/* HOME TEAM ML!!!!!!!!!!! */}
												<div className='line2Col'>
													{game.Odds[0]
														.PointSpreadAway == 0 ||
													game.Odds[0]
														.PointSpreadAway ==
														0.0 ? (
														<div className='lineContainer'>
															N/A
														</div>
													) : (
														<div className='lineContainer'>
															{/* <div className='lineodds'>
													{game.Odds[0]
														.MoneyLineHome[0] ===
													'-'
														? game.Odds[0]
																.MoneyLineHome
														: '+' +
														  game.Odds[0]
																.MoneyLineHome}
												</div> */}
															<div className='lineTrend'>
																{/* {typeof bets[apiId] !== 'undefined' && (typeof (bets[apiId][game.HomeTeam + " ML"]) !== 'undefined' ? typeof (bets[apiId][game.AwayTeam + " ML"]) !== 'undefined' ? `${(bets[apiId][game.HomeTeam + " ML"] / (bets[apiId][game.HomeTeam + " ML"] + bets[apiId][game.AwayTeam + " ML"]) * 100)}%` : `${100}%` : `${0}%`)} */}
																{typeof bets[
																	apiId
																] !==
																	'undefined' &&
																	(typeof bets[
																		apiId
																	][
																		'HomeTeam ML'
																	] !==
																	'undefined' ? (
																		typeof bets[
																			apiId
																		][
																			'AwayTeam ML'
																		] !==
																		'undefined' ? (
																			<ProgressBar
																				completed={`${
																					((bets[
																						apiId
																					][
																						'HomeTeam ML'
																					] /
																						(bets[
																							apiId
																						][
																							'HomeTeam ML'
																						] +
																							bets[
																								apiId
																							][
																								'AwayTeam ML'
																							])) *
																					100).toFixed(2)
																				}`}
																			/>
																		) : (
																			<ProgressBar
																				completed={`${100}`}
																			/>
																		)
																	) : (
																		<ProgressBar
																			completed={`${0}`}
																		/>
																	))}
															</div>
														</div>
													)}
												</div>
											</TableRow>
										</GameCard>
									);
								})}
					</Games>
				</GamesContainer>
			</SportsContainer>
		</div>
	);
};

export default Projections;
