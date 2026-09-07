"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import CalculatorCard from "./CalculatorCard";
import ResultsPanel from "@/components/results/ResultsPanel";
import ProteinGauge from "@/components/results/ProteinGauge";
import StickyBar from "@/components/results/StickyBar";
import MealPlan from "@/components/meal-plan/MealPlan";
import FoodEquivalents from "@/components/food-equivalents/FoodEquivalents";
import UserNameModal from "@/components/user-name-modal/UserNameModal";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/ui/Hero";
import {
  calculateProtein,
  convertWeightValue,
  validateBodyFat,
  validateWeight,
} from "@/lib/calculations";
import { getItem, setItem, removeItem, STORAGE_KEYS } from "@/lib/storage";
import type {
  ActivityLevel,
  CalculatorInputs,
  DietaryPreference,
  FitnessGoal,
  WeightUnit,
} from "@/types";

const DEFAULT_INPUTS: CalculatorInputs = {
  weight: null,
  unit: "kg",
  goal: "muscle-building",
  activity: "moderately-active",
  bodyFatEnabled: false,
  bodyFat: null,
  meals: 4,
  diet: "omnivore",
};

export default function CalculatorApp() {
  const [weightInput, setWeightInput] = useState("");
  const [unit, setUnit] = useState<WeightUnit>("kg");
  const [goal, setGoal] = useState<FitnessGoal>(DEFAULT_INPUTS.goal);
  const [activity, setActivity] = useState<ActivityLevel>(DEFAULT_INPUTS.activity);
  const [bodyFatEnabled, setBodyFatEnabled] = useState(false);
  const [bodyFatInput, setBodyFatInput] = useState("");
  const [meals, setMeals] = useState(DEFAULT_INPUTS.meals);
  const [diet, setDiet] = useState<DietaryPreference>(DEFAULT_INPUTS.diet);

  const [userName, setUserName] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted name on mount.
  useEffect(() => {
    const storedName = getItem(STORAGE_KEYS.name);
    const onboarded = getItem(STORAGE_KEYS.onboarded);
    if (storedName) setUserName(storedName);
    if (!onboarded) {
      setShowOnboarding(true);
    }
    setHydrated(true);
  }, []);

  function handleEditName() {
    const next = window.prompt("Update your display name", userName ?? "");
    if (next === null) return;
    const trimmed = next.trim().slice(0, 40);
    if (trimmed.length === 0) {
      removeItem(STORAGE_KEYS.name);
      setUserName(null);
    } else {
      setItem(STORAGE_KEYS.name, trimmed);
      setUserName(trimmed);
    }
  }

  function handleClearData() {
    const confirmed = window.confirm(
      "Clear your saved name and preferences from this device?"
    );
    if (!confirmed) return;
    removeItem(STORAGE_KEYS.name);
    removeItem(STORAGE_KEYS.onboarded);
    removeItem(STORAGE_KEYS.preferences);
    setUserName(null);
  }

  function handleOnboardingSubmit(name: string | null) {
    setItem(STORAGE_KEYS.onboarded, "1");
    if (name) {
      setItem(STORAGE_KEYS.name, name);
      setUserName(name);
    }
    setShowOnboarding(false);
  }

  const weightValidation = useMemo(
    () => validateWeight(weightInput, unit),
    [weightInput, unit]
  );
  const bodyFatValidation = useMemo(
    () => validateBodyFat(bodyFatInput),
    [bodyFatInput]
  );

  const showWeightError = weightInput.trim() !== "" && !weightValidation.valid;
  const showBodyFatError = bodyFatEnabled && bodyFatInput.trim() !== "" && !bodyFatValidation.valid;

  const result = useMemo(() => {
    const inputs: CalculatorInputs = {
      weight: weightValidation.valid ? weightValidation.parsed : null,
      unit,
      goal,
      activity,
      bodyFatEnabled,
      bodyFat: bodyFatValidation.valid ? bodyFatValidation.parsed : null,
      meals,
      diet,
    };
    return calculateProtein(inputs);
  }, [weightValidation, unit, goal, activity, bodyFatEnabled, bodyFatValidation, meals, diet]);

  function handleUnitChange(nextUnit: WeightUnit) {
    if (nextUnit === unit) return;
    const currentValue = weightValidation.parsed;
    const converted = convertWeightValue(currentValue, unit, nextUnit);
    setUnit(nextUnit);
    setWeightInput(converted !== null ? String(converted) : weightInput);
  }

  function handleReset() {
    setWeightInput("");
    setUnit("kg");
    setGoal(DEFAULT_INPUTS.goal);
    setActivity(DEFAULT_INPUTS.activity);
    setBodyFatEnabled(false);
    setBodyFatInput("");
    setMeals(DEFAULT_INPUTS.meals);
    setDiet(DEFAULT_INPUTS.diet);
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <Navbar
        userName={hydrated ? userName : null}
        onEditName={handleEditName}
        onClearData={handleClearData}
      />
      <UserNameModal open={hydrated && showOnboarding} onSubmit={handleOnboardingSubmit} />
      <Hero result={result} />

      <section className="section" aria-labelledby="calculator-heading">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Calculator</span>
            <h2 id="calculator-heading">Build your protein plan</h2>
            <p>
              Fill in your details below. Results update instantly as you
              type — nothing is sent anywhere.
            </p>
          </div>

          {(showWeightError || showBodyFatError) && (
            <div className="validation-banner" role="alert">
              <AlertCircle size={18} aria-hidden="true" />
              <span>
                {showWeightError
                  ? weightValidation.message
                  : bodyFatValidation.message}
              </span>
            </div>
          )}

          <div className="results-layout">
            <CalculatorCard
              weightInput={weightInput}
              weightError={showWeightError ? weightValidation.message : undefined}
              unit={unit}
              goal={goal}
              activity={activity}
              bodyFatEnabled={bodyFatEnabled}
              bodyFatInput={bodyFatInput}
              bodyFatError={showBodyFatError ? bodyFatValidation.message : undefined}
              meals={meals}
              diet={diet}
              onWeightChange={setWeightInput}
              onUnitChange={handleUnitChange}
              onGoalChange={setGoal}
              onActivityChange={setActivity}
              onBodyFatToggle={setBodyFatEnabled}
              onBodyFatChange={setBodyFatInput}
              onMealsChange={setMeals}
              onDietChange={setDiet}
            />

            <ResultsPanel result={result} onReset={handleReset} />

            {result && (
              <>
                <ProteinGauge low={result.low} high={result.high} multiplier={result.multiplier} />

                <div>
                  <h3 style={{ marginBottom: 14, fontSize: "1.15rem" }}>
                    Your Protein Plan
                  </h3>
                  <MealPlan target={result.target} meals={meals} />
                </div>

                <div>
                  <h3 style={{ marginBottom: 14, fontSize: "1.15rem" }}>
                    What does your protein target look like?
                  </h3>
                  <FoodEquivalents target={result.target} diet={diet} />
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <StickyBar result={result} />
    </>
  );
}
