"use client";
import React from "react";
import * as S from "../../styles/style";
import { useState } from "react";
import LinearWithValueLabel from "../ProgressBar";
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Cards = ({ icon, label, value, balance, isGoal, goals }) => {
  const [goal, setGoal] = useState("1");
  return (
    <S.CardContainer>
      <S.IconContainer>{icon}</S.IconContainer>
      <S.TextContainer>
        {!isGoal && (
          <>
            <div>{label}</div>
            <div>
              <strong>{value}</strong>
            </div>
          </>
        )}
        {isGoal && (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <S.FormControl>
              <S.InputLabel id="goal">Goal</S.InputLabel>
              <S.Select
                labelId="goal"
                id="goal-select"
                name="goal"
                value={goal}
                label="Goal"
                onChange={(e) => setGoal(e.target.value)}
                size="small"
              >
                {goals.map((item) => (
                  <S.MenuItem key={item.id} value={item.id}>
                    {item.description}
                  </S.MenuItem>
                ))}
              </S.Select>
            </S.FormControl>

            <div>
              <strong>
                R$ {goals.find((item) => item.id == goal)?.value / 100}
              </strong>
                  <LinearProgress variant="determinate" value={balance/(goals.find((item) => item.id == goal)?.value / 100)} />
                <Box sx={{ minWidth: 35 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >{`${Math.round(balance/(goals.find((item) => item.id == goal)?.value / 100))}%`}</Typography>
                </Box>
            </div>
          </div>
        )}
      </S.TextContainer>
    </S.CardContainer>
  );
};

export default Cards;
