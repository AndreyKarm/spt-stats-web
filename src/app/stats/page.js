'use client';
import React, { useState } from 'react';
import Graph from './modules/graph';

const timeOptions = [
    { value: "1d", label: "1 Day" },
    { value: "7d", label: "1 Week" },
    { value: "30d", label: "1 Month" },
    { value: "all", label: "All Time" }
];

const statOptions = [
    { value: "exp", label: "exp" },
    { value: "totalInGameTime", label: "totalInGameTime" },
    { value: "CurrentWinStreak", label: "CurrentWinStreak" },
    { value: "Sessions", label: "Sessions" },
    { value: "ExitStatus", label: "ExitStatus" },
    { value: "LifeTime", label: "LifeTime" },
    { value: "Kills", label: "Kills" },
    { value: "Deaths", label: "Deaths" },
    { value: "KilledBear", label: "KilledBear" },
    { value: "KilledUsec", label: "KilledUsec" },
    { value: "KilledSavage", label: "KilledSavage" },
    { value: "KilledPmc", label: "KilledPmc" },
    { value: "KilledBoss", label: "KilledBoss" },
    { value: "KilledWithKnife", label: "KilledWithKnife" },
    { value: "KilledWithPistol", label: "KilledWithPistol" },
    { value: "KilledWithSmg", label: "KilledWithSmg" },
    { value: "KilledWithShotgun", label: "KilledWithShotgun" },
    { value: "KilledWithAssaultRifle", label: "KilledWithAssaultRifle" },
    { value: "KilledWithAssaultCarabine", label: "KilledWithAssaultCarabine" },
    { value: "KilledWithMachinegun", label: "KilledWithMachinegun" },
    { value: "KilledWithMarksmanRifle", label: "KilledWithMarksmanRifle" },
    { value: "KilledWithSniperRifle", label: "KilledWithSniperRifle" },
    { value: "KilledWithSpecialWeapon", label: "KilledWithSpecialWeapon" },
    { value: "KilledWithThrownWeapon", label: "KilledWithThrownWeapon" },
    { value: "KilledTripwireMine", label: "KilledTripwireMine" },
    { value: "HeadShots", label: "HeadShots" },
    { value: "BloodLoss", label: "BloodLoss" },
    { value: "BodyPartsDestroyed", label: "BodyPartsDestroyed" },
    { value: "Heal", label: "Heal" },
    { value: "Fractures", label: "Fractures" },
    { value: "Contusion", label: "Contusion" },
    { value: "Tremor", label: "Tremor" },
    { value: "Dehydration", label: "Dehydration" },
    { value: "Exhaustion", label: "Exhaustion" },
    { value: "Medcines", label: "Medcines" },
    { value: "BodiesLooted", label: "BodiesLooted" },
    { value: "SafeLooted", label: "SafeLooted" },
    { value: "Weapons", label: "Weapons" },
    { value: "Ammunition", label: "Ammunition" },
    { value: "Mods", label: "Mods" },
    { value: "ThrowWeapons", label: "ThrowWeapons" },
    { value: "SpecialItems", label: "SpecialItems" },
    { value: "BartItems", label: "BartItems" },
    { value: "CauseBodyDamage", label: "CauseBodyDamage" },
    { value: "CauseArmorDamage", label: "CauseArmorDamage" },
    { value: "HitCount", label: "HitCount" },
    { value: "MoneyRUB", label: "MoneyRUB" },
    { value: "MoneyEUR", label: "MoneyEUR" },
    { value: "MoneyUSD", label: "MoneyUSD" },
    { value: "AmmoUsed", label: "AmmoUsed" },
    { value: "CombatDamage", label: "CombatDamage" }
];

export default function Stats() {
    const [selectedStat, setSelectedStat] = useState('');
    const [timeRange, setTimeRange] = useState("7d");

    const handleStatChange = (e) => {
        setSelectedStat(e.target.value);
    };

    return (
        <div className="container">
            <div className="controls-panel">
                <div className="stats-section">
                    <h3>Select Statistics</h3>
                    <div className="stats-grid">
                        {statOptions.map(stat => (
                            <label key={stat.value} className="stat-checkbox">
                                <input
                                    type="radio"
                                    name="stats"
                                    value={stat.value}
                                    checked={selectedStat === stat.value}
                                    onChange={handleStatChange}
                                />
                                <span>{stat.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="time-section">
                    <h3>Select Time Range</h3>
                    <select 
                        value={timeRange} 
                        onChange={(e) => setTimeRange(e.target.value)}
                    >
                        {timeOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="graph-container">
                {selectedStat && (
                    <Graph 
                        timeRange={timeRange} 
                        selectedStats={[selectedStat]}
                    />
                )}
            </div>

            <style jsx>{`
                .container {
                    padding: 20px;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .controls-panel {
                    margin-bottom: 20px;
                }
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 10px;
                }
                .stat-checkbox {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                .time-section {
                    margin: 20px 0;
                }
                .submit-button {
                    padding: 10px 20px;
                    background: #0070f3;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .submit-button:hover {
                    background: #0051b3;
                }
                .graph-container {
                    margin-top: 20px;
                }
            `}</style>
        </div>
    );
}