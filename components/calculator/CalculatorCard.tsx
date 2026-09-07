"use client";

import WeightField from "./WeightField";
import GoalField from "./GoalField";
import ActivityField from "./ActivityField";
import BodyFatField from "./BodyFatField";
import MealsField from "./MealsField";
import DietField from "./DietField";
import type {
  ActivityLevel,
  DietaryPreference,
  FitnessGoal,
  WeightUnit,
} from "@/types";

interface CalculatorCardProps {
  weightInput: string;
  weightError?: string;
  unit: WeightUnit;
  goal: FitnessGoal;
  activity: ActivityLevel;
  bodyFatEnabled: boolean;
  bodyFatInput: string;
  bodyFatError?: string;
  meals: number;
  diet: DietaryPreference;
  onWeightChange: (value: string) => void;
  onUnitChange: (unit: WeightUnit) => void;
  onGoalChange: (goal: FitnessGoal) => void;
  onActivityChange: (activity: ActivityLevel) => void;
  onBodyFatToggle: (enabled: boolean) => void;
  onBodyFatChange: (value: string) => void;
  onMealsChange: (meals: number) => void;
  onDietChange: (diet: DietaryPreference) => void;
}

export default function CalculatorCard(props: CalculatorCardProps) {
  return (
    <div className="card calculator-card" id="calculator">
      <WeightField
        value={props.weightInput}
        unit={props.unit}
        error={props.weightError}
        onChange={props.onWeightChange}
        onUnitChange={props.onUnitChange}
      />
      <GoalField value={props.goal} onChange={props.onGoalChange} />
      <ActivityField value={props.activity} onChange={props.onActivityChange} />
      <BodyFatField
        enabled={props.bodyFatEnabled}
        value={props.bodyFatInput}
        error={props.bodyFatError}
        onToggle={props.onBodyFatToggle}
        onChange={props.onBodyFatChange}
      />
      <MealsField value={props.meals} onChange={props.onMealsChange} />
      <DietField value={props.diet} onChange={props.onDietChange} />
    </div>
  );
}
