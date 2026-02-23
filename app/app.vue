<template>
  <div>
    <div class="side-buttons-container">
      <div class="side-buttons">
        <button @click="saveSheetToLocal" title="Save As">
          <img :src="saveFileIcon" width="36" alt="save as" />
        </button>
        <input
          type="file"
          accept=".sheet, .json"
          hidden
          id="sheet-upload"
          @change="loadSheetFromLocal"
        />
        <label for="sheet-upload" title="Upload Sheet">
          <img :src="uploadFileIcon" width="36" alt="upload sheet" />
        </label>
        <button @click="loadSheetFromDrive" title="Load from Google Drive">
          <img :src="driveOpenIcon" width="36" alt="load from google drive" />
        </button>
        <button @click="saveSheetToDrive" title="Save to Google Drive">
          <img :src="driveSaveIcon" width="36" alt="save to google drive" />
        </button>
        <button @click="openPrintDialog" title="Print Sheet">
          <img :src="printIcon" width="36" alt="print sheet" />
        </button>
      </div>
    </div>

    <div class="page">
      <img :src="fullBar" style="width: 7.5in" alt="bar" />
      <table>
        <tbody>
          <tr>
            <td>
              <img :src="logo" style="height: 1in" alt="exalted-2e-logo" />
            </td>
            <td>
              <table>
                <tbody>
                  <tr style="line-height: 0.3">
                    <td><p>Name:</p></td>
                    <td>
                      <input
                        type="text"
                        class="text-input"
                        v-model="characterNameRef"
                        style="width: 2.25in"
                      />
                    </td>
                    <td style="padding-left: 0.15in">
                      <p>Exalt:</p>
                    </td>
                    <td>
                      <select
                        class="text-input"
                        v-model="exaltTypeRef"
                        style="width: 1.25in"
                      >
                        <option
                          v-for="value in Object.keys(exaltData)"
                          :value="value"
                        >
                          {{ capitalizeFirstLetter(value) }}
                        </option>
                      </select>
                    </td>
                  </tr>
                  <tr style="line-height: 0.3">
                    <td><p>Player:</p></td>
                    <td>
                      <input
                        type="text"
                        class="text-input"
                        v-model="playerNameRef"
                        style="width: 2.25in"
                      />
                    </td>
                    <td style="padding-left: 0.15in">
                      <p>Caste:</p>
                    </td>
                    <td>
                      <select
                        class="text-input"
                        v-model="casteRef"
                        style="width: 1.25in"
                      >
                        <option></option>
                        <option
                          v-if="
                            Object.keys(exaltData[exaltTypeRef]).includes(
                              'attributes'
                            )
                          "
                          v-for="(val, caste, index) in exaltData[exaltTypeRef]
                            .attributes"
                          :key="caste"
                          :value="caste"
                        >
                          {{ capitalizeFirstLetter(caste) }}
                        </option>
                        <option
                          v-for="(val, caste, index) in exaltData[exaltTypeRef]
                            .abilities"
                          v-if="
                            !Object.keys(exaltData[exaltTypeRef]).includes(
                              'attributes'
                            )
                          "
                          :key="caste"
                          :value="caste"
                        >
                          {{ capitalizeFirstLetter(caste) }}
                        </option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="full-bar-with-text">
        <img :src="fullBar" style="width: 7.5in" alt="bar" />
        <div>Attributes</div>
      </div>
      <table style="width: 100%; margin-block: 0.1in">
        <tbody>
          <tr>
            <td>
              <input
                type="checkbox"
                style="height: 14px; width: 14px; margin-block: 0"
                v-if="
                  Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                :checked="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'strength'
                  )
                "
                :disabled="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'strength'
                  )
                "
              />
              {{
                Object.keys(exaltData[exaltTypeRef]).includes("attributes")
                  ? "Strength_"
                  : "Strength____"
              }}
              <FiveDotRadio
                class="attribute-dots"
                :value="strengthRef"
                :onUpdate="(n) => (strengthRef = n)"
                source="strength"
              />
            </td>
            <td>
              <input
                type="checkbox"
                style="height: 14px; width: 14px; margin-block: 0"
                v-if="
                  Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                :checked="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'charisma'
                  )
                "
                :disabled="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'charisma'
                  )
                "
              />
              {{
                Object.keys(exaltData[exaltTypeRef]).includes("attributes")
                  ? "Charisma___"
                  : "Charisma_______"
              }}
              <FiveDotRadio
                class="attribute-dots"
                :value="charismaRef"
                :onUpdate="(n) => (charismaRef = n)"
                source="charisma"
              />
            </td>
            <td>
              <input
                type="checkbox"
                style="height: 14px; width: 14px; margin-block: 0"
                v-if="
                  Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                :checked="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'perception'
                  )
                "
                :disabled="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'perception'
                  )
                "
              />
              {{
                Object.keys(exaltData[exaltTypeRef]).includes("attributes")
                  ? "Perception"
                  : "Perception_____"
              }}
              <FiveDotRadio
                class="attribute-dots"
                :value="perceptionRef"
                :onUpdate="(n) => (perceptionRef = n)"
                source="perception"
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="checkbox"
                style="height: 14px; width: 14px; margin-block: 0"
                v-if="
                  Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                :checked="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'dexterity'
                  )
                "
                :disabled="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'dexterity'
                  )
                "
              />
              {{
                Object.keys(exaltData[exaltTypeRef]).includes("attributes")
                  ? "Dexterity"
                  : "Dexterity___"
              }}
              <FiveDotRadio
                class="attribute-dots"
                :value="dexterityRef"
                :onUpdate="(n) => (dexterityRef = n)"
                source="dexterity"
              />
            </td>
            <td>
              <input
                type="checkbox"
                style="height: 14px; width: 14px; margin-block: 0"
                v-if="
                  Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                :checked="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'manipulation'
                  )
                "
                :disabled="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'manipulation'
                  )
                "
              />
              {{
                Object.keys(exaltData[exaltTypeRef]).includes("attributes")
                  ? "Manipulation"
                  : "Manipulation___"
              }}
              <FiveDotRadio
                class="attribute-dots"
                :value="manipulationRef"
                :onUpdate="(n) => (manipulationRef = n)"
                source="manipulation"
              />
            </td>
            <td>
              <input
                type="checkbox"
                style="height: 14px; width: 14px; margin-block: 0"
                v-if="
                  Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                :checked="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'intelligence'
                  )
                "
                :disabled="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'intelligence'
                  )
                "
              />
              {{
                Object.keys(exaltData[exaltTypeRef]).includes("attributes")
                  ? "Intelligence"
                  : "Intelligence___"
              }}
              <FiveDotRadio
                class="attribute-dots"
                :value="intelligenceRef"
                :onUpdate="(n) => (intelligenceRef = n)"
                source="intelligence"
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="checkbox"
                style="height: 14px; width: 14px; margin-block: 0"
                v-if="
                  Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                :checked="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'stamina'
                  )
                "
                :disabled="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'stamina'
                  )
                "
              />
              {{
                Object.keys(exaltData[exaltTypeRef]).includes("attributes")
                  ? "Stamina_"
                  : "Stamina____"
              }}
              <FiveDotRadio
                class="attribute-dots"
                :value="staminaRef"
                :onUpdate="(n) => (staminaRef = n)"
                source="stamina"
              />
            </td>
            <td>
              <input
                type="checkbox"
                style="height: 14px; width: 14px; margin-block: 0"
                v-if="
                  Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                :checked="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'appearance'
                  )
                "
                :disabled="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'appearance'
                  )
                "
              />
              {{
                Object.keys(exaltData[exaltTypeRef]).includes("attributes")
                  ? "Appearance_"
                  : "Appearance_____"
              }}
              <FiveDotRadio
                class="attribute-dots"
                :value="appearanceRef"
                :onUpdate="(n) => (appearanceRef = n)"
                source="appearance"
              />
            </td>
            <td>
              <input
                type="checkbox"
                style="height: 14px; width: 14px; margin-block: 0"
                v-if="
                  Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                :checked="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes('wits')
                "
                :disabled="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes('wits')
                "
              />
              {{
                Object.keys(exaltData[exaltTypeRef]).includes("attributes")
                  ? "Wits_______"
                  : "Wits___________"
              }}
              <FiveDotRadio
                class="attribute-dots"
                :value="witsRef"
                :onUpdate="(n) => (witsRef = n)"
                source="wits"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="full-bar-with-text">
        <img :src="fullBar" style="width: 7.5in" alt="bar" />
        <div>Abilities</div>
      </div>
      <table
        style="width: 100%; margin-block: 0.1in; table-layout: fixed"
        id="ability-table"
      >
        <tbody>
          <tr style="text-align: center">
            <td>
              {{
                capitalizeFirstLetter(
                  Object.keys(exaltData[exaltTypeRef].abilities)[0]
                )
              }}
            </td>
            <td>
              {{
                capitalizeFirstLetter(
                  Object.keys(exaltData[exaltTypeRef].abilities)[1]
                )
              }}
            </td>
            <td>
              {{
                capitalizeFirstLetter(
                  Object.keys(exaltData[exaltTypeRef].abilities)[2]
                )
              }}
            </td>
          </tr>
          <tr
            v-for="(val, index) in exaltData[exaltTypeRef].abilities[
              Object.keys(exaltData[exaltTypeRef].abilities)[0]
            ]"
          >
            <td
              :style="
                Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                  ? 'padding-inline: .2in'
                  : ''
              "
            >
              <AbilityScore
                :label="
                  capitalizeFirstLetter(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[0]
                    ][index]
                  ) + '__'
                "
                :source="
                  exaltData[exaltTypeRef].abilities[
                    Object.keys(exaltData[exaltTypeRef].abilities)[0]
                  ][index]
                "
                :checkbox="
                  !Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                :checked="
                  exaltData[exaltTypeRef].abilities[casteRef] &&
                  exaltData[exaltTypeRef].abilities[casteRef].includes(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[0]
                    ][index]
                  )
                "
                :disabled="
                  exaltData[exaltTypeRef].abilities[casteRef] &&
                  exaltData[exaltTypeRef].abilities[casteRef].includes(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[0]
                    ][index]
                  )
                "
                :onUpdate="
                  (n) =>
                    (abilityScoreRefs[
                      exaltData[exaltTypeRef].abilities[
                        Object.keys(exaltData[exaltTypeRef].abilities)[0]
                      ][index]
                    ] = n)
                "
                :value="
                  abilityScoreRefs[
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[0]
                    ][index]
                  ]
                "
              />
            </td>
            <td
              :style="
                Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                  ? 'padding-inline: .2in'
                  : ''
              "
            >
              <AbilityScore
                :label="
                  capitalizeFirstLetter(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[1]
                    ][index]
                  ) + '__'
                "
                :source="
                  exaltData[exaltTypeRef].abilities[
                    Object.keys(exaltData[exaltTypeRef].abilities)[1]
                  ][index]
                "
                :checkbox="
                  !Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                :checked="
                  exaltData[exaltTypeRef].abilities[casteRef] &&
                  exaltData[exaltTypeRef].abilities[casteRef].includes(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[1]
                    ][index]
                  )
                "
                :disabled="
                  exaltData[exaltTypeRef].abilities[casteRef] &&
                  exaltData[exaltTypeRef].abilities[casteRef].includes(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[1]
                    ][index]
                  )
                "
                :onUpdate="
                  (n) =>
                    (abilityScoreRefs[
                      exaltData[exaltTypeRef].abilities[
                        Object.keys(exaltData[exaltTypeRef].abilities)[1]
                      ][index]
                    ] = n)
                "
                :value="
                  abilityScoreRefs[
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[1]
                    ][index]
                  ]
                "
              />
            </td>
            <td
              :style="
                Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                  ? 'padding-inline: .2in'
                  : ''
              "
            >
              <AbilityScore
                :label="
                  capitalizeFirstLetter(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[2]
                    ][index]
                  ) + '__'
                "
                :source="
                  exaltData[exaltTypeRef].abilities[
                    Object.keys(exaltData[exaltTypeRef].abilities)[2]
                  ][index]
                "
                :checkbox="
                  !Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                :checked="
                  exaltData[exaltTypeRef].abilities[casteRef] &&
                  exaltData[exaltTypeRef].abilities[casteRef].includes(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[2]
                    ][index]
                  )
                "
                :disabled="
                  exaltData[exaltTypeRef].abilities[casteRef] &&
                  exaltData[exaltTypeRef].abilities[casteRef].includes(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[2]
                    ][index]
                  )
                "
                :onUpdate="
                  (n) =>
                    (abilityScoreRefs[
                      exaltData[exaltTypeRef].abilities[
                        Object.keys(exaltData[exaltTypeRef].abilities)[2]
                      ][index]
                    ] = n)
                "
                :value="
                  abilityScoreRefs[
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[2]
                    ][index]
                  ]
                "
                v-if="
                  exaltData[exaltTypeRef].abilities[
                    Object.keys(exaltData[exaltTypeRef].abilities)[2]
                  ][index] != ''
                "
              />
              <!-- TODO: wire up these blanks -->
              <AbilityScore
                :label="
                  capitalizeFirstLetter(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[2]
                    ][index]
                  ) + '__'
                "
                :source="'other' + (index - 5)"
                :checkbox="
                  !Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                v-if="
                  exaltData[exaltTypeRef].abilities[
                    Object.keys(exaltData[exaltTypeRef].abilities)[2]
                  ][index] == ''
                "
              />
            </td>
          </tr>
          <tr
            style="text-align: center"
            v-if="Object.keys(exaltData[exaltTypeRef].abilities).length > 3"
          >
            <td>
              {{
                capitalizeFirstLetter(
                  Object.keys(exaltData[exaltTypeRef].abilities)[3]
                )
              }}
            </td>
            <td>
              {{
                capitalizeFirstLetter(
                  Object.keys(exaltData[exaltTypeRef].abilities)[4]
                )
              }}
            </td>
            <td>Other</td>
          </tr>
          <tr
            v-if="Object.keys(exaltData[exaltTypeRef].abilities).length > 3"
            v-for="(val, index) in exaltData[exaltTypeRef].abilities[
              Object.keys(exaltData[exaltTypeRef].abilities)[3]
            ]"
          >
            <td>
              <AbilityScore
                :label="
                  capitalizeFirstLetter(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[3]
                    ][index]
                  ) + '__'
                "
                :source="
                  exaltData[exaltTypeRef].abilities[
                    Object.keys(exaltData[exaltTypeRef].abilities)[3]
                  ][index]
                "
                :checkbox="
                  !Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                :checked="
                  exaltData[exaltTypeRef].abilities[casteRef] &&
                  exaltData[exaltTypeRef].abilities[casteRef].includes(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[3]
                    ][index]
                  )
                "
                :disabled="
                  exaltData[exaltTypeRef].abilities[casteRef] &&
                  exaltData[exaltTypeRef].abilities[casteRef].includes(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[3]
                    ][index]
                  )
                "
                :onUpdate="
                  (n) =>
                    (abilityScoreRefs[
                      exaltData[exaltTypeRef].abilities[
                        Object.keys(exaltData[exaltTypeRef].abilities)[3]
                      ][index]
                    ] = n)
                "
                :value="
                  abilityScoreRefs[
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[3]
                    ][index]
                  ]
                "
              />
            </td>
            <td>
              <AbilityScore
                :label="
                  capitalizeFirstLetter(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[4]
                    ][index]
                  ) + '__'
                "
                :source="
                  exaltData[exaltTypeRef].abilities[
                    Object.keys(exaltData[exaltTypeRef].abilities)[4]
                  ][index]
                "
                :checkbox="
                  !Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                :checked="
                  exaltData[exaltTypeRef].abilities[casteRef] &&
                  exaltData[exaltTypeRef].abilities[casteRef].includes(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[4]
                    ][index]
                  )
                "
                :disabled="
                  exaltData[exaltTypeRef].abilities[casteRef] &&
                  exaltData[exaltTypeRef].abilities[casteRef].includes(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[4]
                    ][index]
                  )
                "
                :onUpdate="
                  (n) =>
                    (abilityScoreRefs[
                      exaltData[exaltTypeRef].abilities[
                        Object.keys(exaltData[exaltTypeRef].abilities)[4]
                      ][index]
                    ] = n)
                "
                :value="
                  abilityScoreRefs[
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[4]
                    ][index]
                  ]
                "
              />
            </td>
            <td>
              <!-- TODO: need to wire this up too -->
              <AbilityScore
                label="__"
                :source="'other' + index"
                :checkbox="
                  !Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="full-bar-with-text">
        <img :src="fullBar" style="width: 7.5in" alt="bar" />
        <div>Essence</div>
      </div>
      <div style="display: flex">
        <div style="flex: 1">
          <div style="text-align: center">Anima Effects</div>
          <div
            style="
              min-height: 1.6in;
              width: 100%;
              border: 1px solid black;
              white-space: pre-line;
              font-size: x-small;
            "
          >
            {{ animaEffectsComputed }}
          </div>
        </div>
        <div style="flex: 1">
          <div
            style="width: fit-content; margin-inline: auto; margin-block: 0.1in"
          >
            <FiveDotEssence
              :value="essenceRef"
              :onUpdate="(n) => (essenceRef = n)"
              source="essence"
              v-if="exaltTypeRef != 'heroic-mortal'"
            />
            <ThreeDotEssence
              :value="essenceRef"
              :onUpdate="(n) => (essenceRef = n)"
              source="essence"
              v-if="exaltTypeRef == 'heroic-mortal'"
            />
          </div>
          <div style="margin-top: 0.15in; margin-left: 0.25in">
            Personal:&nbsp;&nbsp;&nbsp;
            <input
              type="text"
              class="text-input"
              style="position: relative; width: 0.35in; font-size: large"
            />
            <span style="font-size: x-large">/</span>
            <input
              type="text"
              class="text-input"
              style="position: relative; width: 0.35in; font-size: large"
            />
          </div>
          <div style="margin-top: 0.1in; margin-left: 0.25in">
            Peripheral:
            <input
              type="text"
              class="text-input"
              style="position: relative; width: 0.35in; font-size: large"
            />
            <span style="font-size: x-large">/</span>
            <input
              type="text"
              class="text-input"
              style="position: relative; width: 0.35in; font-size: large"
            />
          </div>
          <div style="margin-top: 0.15in; margin-left: 0.25in">
            Commited:
            <input
              type="text"
              class="text-input"
              style="position: relative; width: 0.35in; font-size: large"
            />
          </div>
        </div>
        <div v-if="exaltTypeRef !== 'heroic-mortal'" style="flex: 1">
          <div style="text-align: center; font-size: large">
            Anima Banner Levels
          </div>
          <div style="font-size: small">
            {{ exaltData[exaltTypeRef].animaBannerLevels[0] }}
          </div>
          <div style="margin-left: 0.2in; font-size: x-small">
            {{ exaltData[exaltTypeRef].animaBannerLevels[1] }}
          </div>
          <div style="font-size: small">
            {{ exaltData[exaltTypeRef].animaBannerLevels[2] }}
          </div>
          <div style="margin-left: 0.2in; font-size: x-small">
            {{ exaltData[exaltTypeRef].animaBannerLevels[3] }}
          </div>
          <div style="font-size: small">
            {{ exaltData[exaltTypeRef].animaBannerLevels[4] }}
          </div>
          <div style="margin-left: 0.2in; font-size: x-small">
            {{ exaltData[exaltTypeRef].animaBannerLevels[5] }}
          </div>
          <div style="font-size: small">
            {{ exaltData[exaltTypeRef].animaBannerLevels[6] }}
          </div>
          <div style="margin-left: 0.2in; font-size: x-small">
            {{ exaltData[exaltTypeRef].animaBannerLevels[7] }}
          </div>
          <div style="font-size: small">
            {{ exaltData[exaltTypeRef].animaBannerLevels[8] }}
          </div>
          <div style="margin-left: 0.2in; font-size: x-small">
            {{ exaltData[exaltTypeRef].animaBannerLevels[9] }}
          </div>
        </div>
        <div v-if="exaltTypeRef === 'heroic-mortal'" style="flex: 1">
          <div style="text-align: center; font-size: large">Notes</div>
        </div>
      </div>
      <img :src="fullBar" style="width: 7.5in" alt="bar" />
      <div style="display: flex; margin-bottom: 0.05in">
        <div style="flex: 4">
          <div style="text-align: center">Health Levels</div>
          <table style="font-size: medium">
            <tbody>
              <tr>
                <td valign="top">-0i Bruised</td>
                <td>
                  <HealthLevelRow
                    :levels="healthRef.zero"
                    :onUpdate="
                      (row, col, value) => (healthRef.zero[row][col] = value)
                    "
                  />
                </td>
              </tr>
              <tr>
                <td valign="top">-1i Hurt</td>
                <td>
                  <HealthLevelRow
                    :levels="healthRef.one"
                    :onUpdate="
                      (row, col, value) => (healthRef.one[row][col] = value)
                    "
                  />
                </td>
              </tr>
              <tr>
                <td valign="top">-2i Wounded</td>
                <td>
                  <HealthLevelRow
                    :levels="healthRef.two"
                    :onUpdate="
                      (row, col, value) => (healthRef.two[row][col] = value)
                    "
                  />
                </td>
              </tr>
              <tr>
                <td valign="top">-4i Crippled</td>
                <td>
                  <HealthLevelRow
                    :levels="healthRef.four"
                    :onUpdate="
                      (row, col, value) => (healthRef.four[row][col] = value)
                    "
                  />
                </td>
              </tr>
              <tr>
                <td valign="top">Wounded</td>
                <td>
                  <HealthLevelRow
                    :levels="healthRef.incapacitated"
                    :onUpdate="
                      (row, col, value) =>
                        (healthRef.incapacitated[row][col] = value)
                    "
                  />
                </td>
              </tr>
              <tr>
                <td valign="top">Dying</td>
                <td>
                  <HealthLevelRow
                    :levels="healthRef.dying"
                    :onUpdate="
                      (row, col, value) => (healthRef.dying[row][col] = value)
                    "
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div style="font-size: small">
            Healing Times:<span style="font-size: x-small; margin-left: 0.2in"
              >Bashing 3hrs / level
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Lethal and
              Aggravated:</span
            >
          </div>
          <div style="font-size: x-small; display: flex">
            <div>
              Dying: Losing one dying level per 5 ticks, can be saved with a
              Wits + Medicine, diff: 5 + (number of dying levels lost)
            </div>
            <table
              style="
                font-size: x-small;
                border-collapse: collapse;
                width: 3in;
                margin-right: 0.4in;
              "
              id="health-level-time-table"
            >
              <tbody>
                <tr>
                  <td style="border: 1px solid black">-0</td>
                  <td style="border: 1px solid black">-1</td>
                  <td style="border: 1px solid black">-2</td>
                  <td style="border: 1px solid black">-4, incap</td>
                </tr>
                <tr>
                  <td style="border: 1px solid black">6 hrs</td>
                  <td style="border: 1px solid black">2 days</td>
                  <td style="border: 1px solid black">4 days</td>
                  <td style="border: 1px solid black">1 week</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div style="flex: 2">
          <div style="text-align: center">Specialties</div>
          <div style="display: flex; justify-content: end">
            <ThreeDotRadio
              source="specialty1"
              :value="specialtyRefs[0].dots"
              :onUpdate="(value) => (specialtyRefs[0].dots = value)"
              style="margin-top: 4px"
            />
            <input
              type="text"
              class="text-input"
              v-model="specialtyRefs[0].name"
              style="width: 1.25in"
            />
            <ThreeDotRadio
              source="specialty2"
              :value="specialtyRefs[1].dots"
              :onUpdate="(value) => (specialtyRefs[1].dots = value)"
              style="margin-top: 4px"
            />
            <input
              type="text"
              class="text-input"
              v-model="specialtyRefs[1].name"
              style="width: 1.25in"
            />
          </div>
          <div style="display: flex; justify-content: end">
            <ThreeDotRadio
              source="specialty3"
              :value="specialtyRefs[2].dots"
              :onUpdate="(value) => (specialtyRefs[2].dots = value)"
              style="margin-top: 4px"
            />
            <input
              type="text"
              class="text-input"
              v-model="specialtyRefs[2].name"
              style="width: 1.25in"
            />
            <ThreeDotRadio
              source="specialty4"
              :value="specialtyRefs[3].dots"
              :onUpdate="(value) => (specialtyRefs[3].dots = value)"
              style="margin-top: 4px"
            />
            <input
              type="text"
              class="text-input"
              v-model="specialtyRefs[3].name"
              style="width: 1.25in"
            />
          </div>
          <div style="display: flex; justify-content: end">
            <ThreeDotRadio
              source="specialty5"
              :value="specialtyRefs[4].dots"
              :onUpdate="(value) => (specialtyRefs[4].dots = value)"
              style="margin-top: 4px"
            />
            <input
              type="text"
              class="text-input"
              v-model="specialtyRefs[4].name"
              style="width: 1.25in"
            />
            <ThreeDotRadio
              source="specialty6"
              :value="specialtyRefs[5].dots"
              :onUpdate="(value) => (specialtyRefs[5].dots = value)"
              style="margin-top: 4px"
            />
            <input
              type="text"
              class="text-input"
              v-model="specialtyRefs[5].name"
              style="width: 1.25in"
            />
          </div>
          <div style="display: flex; justify-content: end">
            <ThreeDotRadio
              source="specialty7"
              :value="specialtyRefs[6].dots"
              :onUpdate="(value) => (specialtyRefs[6].dots = value)"
              style="margin-top: 4px"
            />
            <input
              type="text"
              class="text-input"
              v-model="specialtyRefs[6].name"
              style="width: 1.25in"
            />
            <ThreeDotRadio
              source="specialty8"
              :value="specialtyRefs[7].dots"
              :onUpdate="(value) => (specialtyRefs[7].dots = value)"
              style="margin-top: 4px"
            />
            <input
              type="text"
              class="text-input"
              v-model="specialtyRefs[7].name"
              style="width: 1.25in"
            />
          </div>
          <div style="display: flex; justify-content: end">
            <ThreeDotRadio
              source="specialty9"
              :value="specialtyRefs[8].dots"
              :onUpdate="(value) => (specialtyRefs[8].dots = value)"
              style="margin-top: 4px"
            />
            <input
              type="text"
              class="text-input"
              v-model="specialtyRefs[8].name"
              style="width: 1.25in"
            />
            <ThreeDotRadio
              source="specialty10"
              :value="specialtyRefs[9].dots"
              :onUpdate="(value) => (specialtyRefs[9].dots = value)"
              style="margin-top: 4px"
            />
            <input
              type="text"
              class="text-input"
              v-model="specialtyRefs[9].name"
              style="width: 1.25in"
            />
          </div>
          <div style="display: flex; justify-content: end">
            <ThreeDotRadio
              source="specialty11"
              :value="specialtyRefs[10].dots"
              :onUpdate="(value) => (specialtyRefs[10].dots = value)"
              style="margin-top: 4px"
            />
            <input
              type="text"
              class="text-input"
              v-model="specialtyRefs[10].name"
              style="width: 1.25in"
            />
            <ThreeDotRadio
              source="specialty12"
              :value="specialtyRefs[11].dots"
              :onUpdate="(value) => (specialtyRefs[11].dots = value)"
              style="margin-top: 4px"
            />
            <input
              type="text"
              class="text-input"
              v-model="specialtyRefs[11].name"
              style="width: 1.25in"
            />
          </div>
          <div style="display: flex; justify-content: end">
            <ThreeDotRadio
              source="specialty13"
              :value="specialtyRefs[12].dots"
              :onUpdate="(value) => (specialtyRefs[12].dots = value)"
              style="margin-top: 4px"
            />
            <input
              type="text"
              class="text-input"
              v-model="specialtyRefs[12].name"
              style="width: 1.25in"
            />
            <ThreeDotRadio
              source="specialty14"
              :value="specialtyRefs[13].dots"
              :onUpdate="(value) => (specialtyRefs[13].dots = value)"
              style="margin-top: 4px"
            />
            <input
              type="text"
              class="text-input"
              v-model="specialtyRefs[13].name"
              style="width: 1.25in"
            />
          </div>
          <div style="display: flex; justify-content: end">
            <ThreeDotRadio
              source="specialty15"
              :value="specialtyRefs[14].dots"
              :onUpdate="(value) => (specialtyRefs[14].dots = value)"
              style="margin-top: 4px"
            />
            <input
              type="text"
              class="text-input"
              v-model="specialtyRefs[14].name"
              style="width: 1.25in"
            />
            <ThreeDotRadio
              source="specialty16"
              :value="specialtyRefs[15].dots"
              :onUpdate="(value) => (specialtyRefs[15].dots = value)"
              style="margin-top: 4px"
            />
            <input
              type="text"
              class="text-input"
              v-model="specialtyRefs[15].name"
              style="width: 1.25in"
            />
          </div>
          <div style="display: flex; justify-content: end">
            <ThreeDotRadio
              source="specialty17"
              :value="specialtyRefs[16].dots"
              :onUpdate="(value) => (specialtyRefs[16].dots = value)"
              style="margin-top: 4px"
            />
            <input
              type="text"
              class="text-input"
              v-model="specialtyRefs[16].name"
              style="width: 1.25in"
            />
            <ThreeDotRadio
              source="specialty18"
              :value="specialtyRefs[17].dots"
              :onUpdate="(value) => (specialtyRefs[17].dots = value)"
              style="margin-top: 4px"
            />
            <input
              type="text"
              class="text-input"
              v-model="specialtyRefs[17].name"
              style="width: 1.25in"
            />
          </div>
          <div style="display: flex; justify-content: end">
            <ThreeDotRadio
              source="specialty19"
              :value="specialtyRefs[18].dots"
              :onUpdate="(value) => (specialtyRefs[18].dots = value)"
              style="margin-top: 4px"
            />
            <input
              type="text"
              class="text-input"
              v-model="specialtyRefs[18].name"
              style="width: 1.25in"
            />
            <ThreeDotRadio
              source="specialty20"
              :value="specialtyRefs[19].dots"
              :onUpdate="(value) => (specialtyRefs[19].dots = value)"
              style="margin-top: 4px"
            />
            <input
              type="text"
              class="text-input"
              v-model="specialtyRefs[19].name"
              style="width: 1.25in"
            />
          </div>
          <div style="display: flex; justify-content: end">
            <ThreeDotRadio
              source="specialty21"
              :value="specialtyRefs[20].dots"
              :onUpdate="(value) => (specialtyRefs[20].dots = value)"
              style="margin-top: 4px"
            />
            <input
              type="text"
              class="text-input"
              v-model="specialtyRefs[20].name"
              style="width: 1.25in"
            />
            <ThreeDotRadio
              source="specialty22"
              :value="specialtyRefs[21].dots"
              :onUpdate="(value) => (specialtyRefs[21].dots = value)"
              style="margin-top: 4px"
            />
            <input
              type="text"
              class="text-input"
              v-model="specialtyRefs[21].name"
              style="width: 1.25in"
            />
          </div>
        </div>
      </div>
      <img :src="fullBar" style="width: 7.5in" alt="bar" />
    </div>

    <div class="page">
      <img :src="fullBar" style="width: 7.5in" alt="bar" />
      <div style="display: flex">
        <img :src="logo" style="height: 1in" alt="exalted-2e-logo" />
        <div style="width: 100%">
          <div style="text-align: center">Social Traits</div>
          <table style="width: 100%; position: relative; top: -0.1in">
            <tbody>
              <tr>
                <td
                  style="
                    line-height: 0.7;
                    padding-left: 0.65in;
                    padding-block: 0;
                  "
                >
                  Dodge MDV:
                  <input
                    type="text"
                    class="text-input"
                    style="position: relative; width: 0.35in; font-size: medium"
                    :value="dodgeMdvComputed"
                  />
                </td>
                <td style="line-height: 0.7; padding-block: 0">
                  Join Combat:
                  <input
                    type="text"
                    class="text-input"
                    style="position: relative; width: 0.35in; font-size: medium"
                    :value="joinCombatComputed"
                  />
                </td>
              </tr>
              <tr>
                <td
                  style="
                    font-size: x-small;
                    padding-left: 0.65in;
                    padding-block: 0;
                  "
                >
                  (Wp + Integrity + Essence + spe.) / 2
                </td>
                <td style="font-size: x-small; padding-block: 0">
                  Wits + Awareness
                </td>
              </tr>
            </tbody>
          </table>
          <div style="display: flex">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Willpower:
            <WillpowerDots
              :valuePerm="willpowerPermRef"
              :onUpdatePerm="(n) => (willpowerPermRef = n)"
              :valueTemp="willpowerTempRef"
              :onUpdateTemp="(n) => (willpowerTempRef = n)"
            />
          </div>
        </div>
      </div>
      <div class="full-bar-with-text">
        <img :src="fullBar" style="width: 7.5in" alt="bar" />
        <div style="padding-block: 0">Social Attacks</div>
      </div>
      <table
        style="
          border-collapse: collapse;
          width: 100%;
          font-size: small;
          margin-bottom: 0.1in;
        "
      >
        <thead>
          <tr>
            <th style="text-align: left">Ability</th>
            <th style="text-align: left">Speed</th>
            <th style="text-align: left">
              Accuracy <span style="font-weight: normal">(Cha/Man)</span>
            </th>
            <th style="text-align: left">
              PMDV <span style="font-weight: normal">(Cha/Man)</span>
            </th>
            <th style="text-align: left">Rate</th>
            <th style="text-align: left">Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr style="background-color: #eee">
            <td style="border: 1px solid black">Investigation</td>
            <td style="border: 1px solid black; text-align: center">5</td>
            <td style="border: 1px solid black; text-align: center"></td>
            <td style="border: 1px solid black; text-align: center"></td>
            <td style="border: 1px solid black; text-align: center">2</td>
            <td style="border: 1px solid black"></td>
          </tr>
          <tr>
            <td style="border: 1px solid black">Performance</td>
            <td style="border: 1px solid black; text-align: center">6</td>
            <td style="border: 1px solid black; text-align: center"></td>
            <td style="border: 1px solid black; text-align: center"></td>
            <td style="border: 1px solid black; text-align: center">1</td>
            <td style="border: 1px solid black">Attacks a whole area</td>
          </tr>
          <tr style="background-color: #eee">
            <td style="border: 1px solid black">Presence</td>
            <td style="border: 1px solid black; text-align: center">4</td>
            <td style="border: 1px solid black; text-align: center"></td>
            <td style="border: 1px solid black; text-align: center"></td>
            <td style="border: 1px solid black; text-align: center">2</td>
            <td style="border: 1px solid black"></td>
          </tr>
        </tbody>
      </table>
      <div class="full-bar-with-text">
        <img :src="fullBar" style="width: 7.5in" alt="bar" />
        <div style="padding-block: 0">In Debate</div>
      </div>
      <SocialCombatInfo />
      <div class="full-bar-with-text">
        <img :src="fullBar" style="width: 7.5in" alt="bar" />
        <div style="padding-block: 0">Virtues</div>
      </div>
      <div style="display: flex">
        <table
          v-if="exaltTypeRef !== 'heroic-mortal'"
          style="
            font-size: x-small;
            text-align: center;
            border-collapse: collapse;
          "
        >
          <tbody>
            <tr>
              <td>Compassion</td>
              <td>Temperance</td>
            </tr>
            <tr>
              <td style="padding-inline: 0.1in">
                <VirtueDots
                  source="compassion"
                  :valuePerm="compassionPermRef"
                  :onUpdatePerm="(n) => (compassionPermRef = n)"
                  :valueTemp="compassionTempRef"
                  :onUpdateTemp="(n) => (compassionTempRef = n)"
                />
              </td>
              <td style="padding-inline: 0.1in">
                <VirtueDots
                  source="temperance"
                  :valuePerm="temperancePermRef"
                  :onUpdatePerm="(n) => (temperancePermRef = n)"
                  :valueTemp="temperanceTempRef"
                  :onUpdateTemp="(n) => (temperanceTempRef = n)"
                />
              </td>
            </tr>
            <tr>
              <td>Conviction</td>
              <td>Valor</td>
            </tr>
            <tr>
              <td style="padding-inline: 0.1in">
                <VirtueDots
                  source="conviction"
                  :valuePerm="convictionPermRef"
                  :onUpdatePerm="(n) => (convictionPermRef = n)"
                  :valueTemp="convictionTempRef"
                  :onUpdateTemp="(n) => (convictionTempRef = n)"
                />
              </td>
              <td style="padding-inline: 0.1in">
                <VirtueDots
                  source="valor"
                  :valuePerm="valorPermRef"
                  :onUpdatePerm="(n) => (valorPermRef = n)"
                  :valueTemp="valorTempRef"
                  :onUpdateTemp="(n) => (valorTempRef = n)"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <table
          v-if="exaltTypeRef === 'heroic-mortal'"
          style="
            font-size: x-small;
            text-align: center;
            border-collapse: collapse;
            width: 100%;
            margin-block: 0.1in;
          "
        >
          <tbody>
            <tr>
              <td>Compassion</td>
              <td>Temperance</td>
              <td>Conviction</td>
              <td>Valor</td>
            </tr>
            <tr>
              <td style="padding-inline: 0.1in">
                <VirtueDots
                  source="compassion"
                  :valuePerm="compassionPermRef"
                  :onUpdatePerm="(n) => (compassionPermRef = n)"
                  :valueTemp="compassionTempRef"
                  :onUpdateTemp="(n) => (compassionTempRef = n)"
                  style="margin-inline: auto"
                />
              </td>
              <td style="padding-inline: 0.1in">
                <VirtueDots
                  source="temperance"
                  :valuePerm="temperancePermRef"
                  :onUpdatePerm="(n) => (temperancePermRef = n)"
                  :valueTemp="temperanceTempRef"
                  :onUpdateTemp="(n) => (temperanceTempRef = n)"
                  style="margin-inline: auto"
                />
              </td>
              <td style="padding-inline: 0.1in">
                <VirtueDots
                  source="conviction"
                  :valuePerm="convictionPermRef"
                  :onUpdatePerm="(n) => (convictionPermRef = n)"
                  :valueTemp="convictionTempRef"
                  :onUpdateTemp="(n) => (convictionTempRef = n)"
                  style="margin-inline: auto"
                />
              </td>
              <td style="padding-inline: 0.1in">
                <VirtueDots
                  source="valor"
                  :valuePerm="valorPermRef"
                  :onUpdatePerm="(n) => (valorPermRef = n)"
                  :valueTemp="valorTempRef"
                  :onUpdateTemp="(n) => (valorTempRef = n)"
                  style="margin-inline: auto"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div
          v-if="exaltTypeRef === 'solar' || exaltTypeRef === 'dragon-blooded'"
          style="margin-left: 0.1in; margin-top: 0.05in"
        >
          <div
            v-if="exaltTypeRef === 'solar'"
            style="display: flex; font-size: small"
          >
            Virtue Flaw:
            <input
              class="text-input"
              v-model="virtueFlawRef"
              list="virtue-flaw-options"
              style="width: 2.7in; background-color: white; font-size: x-small"
            />
            <datalist id="virtue-flaw-options">
              <option
                v-for="(value, key) in exaltData[exaltTypeRef].virtueFlaws"
                :value="key"
              >
                {{ key }}
              </option>
            </datalist>
            <div style="width: 2.2in; text-align: center">Limit points</div>
          </div>
          <div
            v-if="exaltTypeRef === 'dragon-blooded'"
            style="display: flex; font-size: small"
          >
            Primary Virtue:
            <input
              class="text-input"
              v-model="primaryVirtueRef"
              list="primary-virtue-options"
              style="width: 2.55in; background-color: white; font-size: x-small"
            />
            <datalist id="primary-virtue-options">
              <option
                v-for="(value, key) in exaltData[exaltTypeRef].virtues"
                :value="key"
              >
                {{ key }}
              </option>
            </datalist>
            <div style="width: 2.2in; text-align: center">Limit points</div>
          </div>
          <div style="display: flex; font-size: small">
            Duration:
            <input
              type="text"
              class="text-input"
              v-model="limitBreakDurationRef"
              style="width: 2.9in; font-size: x-small"
            />
            <!-- TODO: Why these no display / update also add to saving and loading -->
            <div style="width: 2.2in; text-align: center">
              <LimitPoints
                :value="limitRef"
                :onUpdate="(n) => (limitRef = n)"
              />
            </div>
          </div>
          <div style="display: flex; font-size: small; padding-top: 4px">
            Limit Break Condition:
            <input
              type="text"
              class="text-input"
              v-model="limitBreakConditionRef"
              style="width: 4.3in; font-size: x-small"
            />
          </div>
          <div style="display: flex; font-size: small">
            Partial Control:
            <input
              type="text"
              class="text-input"
              v-model="partialControlRef"
              style="width: 4.7in; font-size: xx-small"
            />
          </div>
          <div style="display: flex; font-size: small">
            No Control:
            <input
              type="text"
              class="text-input"
              v-model="noControlRef"
              style="width: 4.89in; font-size: xx-small"
            />
          </div>
        </div>
      </div>
      <div class="full-bar-with-text" style="margin-top: 0.1in">
        <img :src="fullBar" style="width: 7.5in" alt="bar" />
        <div style="padding-block: 0">Intimacies</div>
      </div>
      <table
        style="
          width: 95%;
          border-collapse: collapse;
          margin-inline: auto;
          margin-top: 0.1in;
        "
      >
        <tbody>
          <tr>
            <td>
              <textarea
                style="width: 100%; height: 1.7in; resize: none"
              ></textarea>
            </td>
            <td>
              <textarea
                style="width: 100%; height: 1.7in; resize: none"
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="full-bar-with-text" style="margin-top: 0.1in">
        <img :src="fullBar" style="width: 7.5in" alt="bar" />
        <div style="padding-block: 0">Motivation</div>
      </div>
      <div style="width: 95%; margin-inline: auto; margin-block: 0.1in">
        <textarea style="width: 100%; height: 1.5in; resize: none"></textarea>
      </div>
      <div class="full-bar-with-text">
        <img :src="fullBar" style="width: 7.5in" alt="bar" />
      </div>
    </div>

    <div class="page">
      <img :src="fullBar" style="width: 7.5in" alt="bar" />
      <div style="display: flex">
        <img :src="logo" style="height: 1in" alt="exalted-2e-logo" />
        <div style="width: 100%">
          <div style="text-align: center">Soak and Defense</div>
          <table style="width: 100%">
            <tbody>
              <tr>
                <td
                  style="
                    line-height: 0.7;
                    padding-left: 0.25in;
                    padding-block: 0;
                  "
                >
                  Bashing Soak:
                  <input
                    type="text"
                    class="text-input"
                    style="position: relative; width: 0.35in; font-size: medium"
                    :value="dodgeMdvComputed"
                  />
                </td>
                <td style="line-height: 0.7; padding-block: 0">
                  Lethal Soak:
                  <input
                    type="text"
                    class="text-input"
                    style="position: relative; width: 0.35in; font-size: medium"
                    :value="joinCombatComputed"
                  />
                </td>
                <td style="line-height: 0.7; padding-block: 0">
                  Aggravated Soak:
                  <input
                    type="text"
                    class="text-input"
                    style="position: relative; width: 0.35in; font-size: medium"
                    :value="joinCombatComputed"
                  />
                </td>
              </tr>
              <tr>
                <td
                  style="
                    font-size: x-small;
                    padding-left: 0.25in;
                    padding-block: 0;
                  "
                >
                  Stamina + Armor (B)
                </td>
                <td style="font-size: x-small; padding-block: 0">
                  Stamina + Armor (L)
                </td>
                <td style="font-size: x-small; padding-block: 0">Armor (L)</td>
              </tr>
            </tbody>
          </table>
          <table style="width: 100%">
            <tbody>
              <tr>
                <td
                  style="
                    line-height: 0.7;
                    padding-left: 0.25in;
                    padding-block: 0;
                  "
                >
                  Dodge DV:
                  <input
                    type="text"
                    class="text-input"
                    style="position: relative; width: 0.35in; font-size: medium"
                    :value="dodgeDvComputed"
                  />
                </td>
                <td style="line-height: 0.7; padding-block: 0">
                  Join Combat:
                  <input
                    type="text"
                    class="text-input"
                    style="position: relative; width: 0.35in; font-size: medium"
                    :value="joinCombatComputed"
                  />
                </td>
                <td style="line-height: 0.7; padding-block: 0">
                  Move / Dash:
                  <input
                    type="text"
                    class="text-input"
                    style="position: relative; width: 0.25in; font-size: medium"
                    :value="joinCombatComputed"
                  />
                  /
                  <input
                    type="text"
                    class="text-input"
                    style="position: relative; width: 0.25in; font-size: medium"
                    :value="joinCombatComputed"
                  />
                </td>
              </tr>
              <tr>
                <td
                  style="
                    font-size: x-small;
                    padding-left: 0.25in;
                    padding-block: 0;
                  "
                >
                  (Dex. + Dodge + Essence + spe.) / 2
                </td>
                <td style="font-size: x-small; padding-block: 0">
                  Wits + Awareness
                </td>
                <td style="font-size: x-small; padding-block: 0">
                  Dex. - armor mobility (+6)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="full-bar-with-text">
        <img :src="fullBar" style="width: 7.5in" alt="bar" />
        <div style="padding-block: 0">Weapons</div>
      </div>

      <table style="width: 100%; border-collapse: collapse">
        <thead>
          <tr style="text-align: left">
            <th>Weapon</th>
            <th>Speed</th>
            <th>Acc</th>
            <th>Damage</th>
            <th>PDV</th>
            <th>Rate</th>
            <th>Range</th>
            <th>Tags</th>
            <th>Notes</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody style="font-size: xx-small">
          <tr
            v-for="(val, index) in weaponAccRefs"
            :key="`weapon-table-row-${index}`"
            :style="{
              backgroundColor: index % 2 === 0 ? '#eee' : 'white',
            }"
          >
            <td style="border: 1px solid black; padding: 0; width: 20%">
              <input
                type="text"
                style="
                  border: none;
                  width: 98%;
                  height: 100%;
                  font-size: xx-small;
                  background-color: transparent;
                "
                v-model="weaponNameRefs[index]"
              />
            </td>
            <td style="border: 1px solid black; padding: 0; width: 7%">
              <input
                type="text"
                style="
                  border: none;
                  width: 95%;
                  height: 100%;
                  font-size: xx-small;
                  background-color: transparent;
                  text-align: center;
                "
                v-model="weaponSpeedRefs[index]"
              />
            </td>
            <td style="border: 1px solid black; padding: 0; width: 7%">
              <div style="display: flex">
                <input
                  type="text"
                  style="
                    border: none;
                    width: 35%;
                    height: 100%;
                    font-size: xx-small;
                    background-color: transparent;
                    text-align: right;
                  "
                  v-model="weaponAccRefs[index].value"
                />
                <input
                  type="text"
                  style="
                    border: none;
                    width: 50%;
                    height: 100%;
                    font-size: xx-small;
                    background-color: transparent;
                    text-align: left;
                  "
                  v-model="weaponAccBonusRefs[index]"
                />
              </div>
            </td>
            <td style="border: 1px solid black; padding: 0; width: 10%">
              <div style="display: flex">
                <input
                  type="text"
                  style="
                    border: none;
                    width: 35%;
                    height: 100%;
                    font-size: xx-small;
                    background-color: transparent;
                    text-align: right;
                  "
                  v-model="weaponDamageRefs[index].value"
                />
                <input
                  type="text"
                  style="
                    border: none;
                    width: 50%;
                    height: 100%;
                    font-size: xx-small;
                    background-color: transparent;
                    text-align: left;
                  "
                  v-model="weaponDamageBonusRefs[index]"
                />
              </div>
            </td>
            <td style="border: 1px solid black; padding: 0; width: 8%">
              <div style="display: flex">
                <input
                  type="text"
                  style="
                    border: none;
                    width: 35%;
                    height: 100%;
                    font-size: xx-small;
                    background-color: transparent;
                    text-align: right;
                  "
                  v-model="weaponPdvRefs[index].value"
                />
                <input
                  type="text"
                  style="
                    border: none;
                    width: 50%;
                    height: 100%;
                    font-size: xx-small;
                    background-color: transparent;
                    text-align: left;
                  "
                  v-model="weaponPdvBonusRefs[index]"
                />
              </div>
            </td>
            <td style="border: 1px solid black; padding: 0; width: 5%">
              <input
                type="text"
                style="
                  border: none;
                  width: 95%;
                  height: 100%;
                  font-size: xx-small;
                  background-color: transparent;
                  text-align: center;
                "
                v-model="weaponRateRefs[index]"
              />
            </td>
            <td style="border: 1px solid black; padding: 0; width: 7%">
              <input
                type="text"
                style="
                  border: none;
                  width: 95%;
                  height: 100%;
                  font-size: xx-small;
                  background-color: transparent;
                  text-align: center;
                "
                v-model="weaponRangeRefs[index]"
              />
            </td>
            <td style="border: 1px solid black; padding: 0; width: 7%">
              <input
                type="text"
                style="
                  border: none;
                  width: 95%;
                  height: 100%;
                  font-size: xx-small;
                  background-color: transparent;
                "
                v-model="weaponTagRefs[index]"
              />
            </td>
            <td style="border: 1px solid black; padding: 0">
              <input
                type="text"
                style="
                  border: none;
                  width: 98%;
                  height: 100%;
                  font-size: xx-small;
                  background-color: transparent;
                "
                v-model="weaponNotesRefs[index]"
              />
            </td>
            <td style="border: 1px solid black; padding: 0; width: 9%">
              <select
                style="
                  border-radius: 0%;
                  border: none;
                  width: 100%;
                  font-size: xx-small;
                  background: transparent;
                "
                v-model="weaponTypeRefs[index]"
              >
                <option value="melee">Melee</option>
                <option value="martial-arts">Martial Arts</option>
                <option value="thrown">Thrown</option>
                <option value="archery">Archery</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="full-bar-with-text">
        <img :src="fullBar" style="width: 7.5in" alt="bar" />
        <div style="padding-block: 0">Armor</div>
      </div>

      <table style="width: 100%; border-collapse: collapse">
        <thead>
          <tr style="text-align: left">
            <th>Armor</th>
            <th>Type</th>
            <th>Soak(L/B)</th>
            <th>Hardness</th>
            <th>Fatigue</th>
            <th>Mobility</th>
            <th>Notes</th>
            <th>Equipped</th>
          </tr>
        </thead>
        <tbody style="font-size: xx-small">
          <tr
            v-for="(val, index) in armorSoakRefs"
            :key="`armor-table-row-${index}`"
            :style="{
              backgroundColor: index % 2 === 0 ? '#eee' : 'white',
            }"
          >
            <td style="border: 1px solid black; padding: 0; width: 20%">
              <input
                type="text"
                style="
                  border: none;
                  width: 98%;
                  height: 100%;
                  font-size: xx-small;
                  background-color: transparent;
                "
                v-model="armorNameRefs[index]"
              />
            </td>
            <td style="border: 1px solid black; padding: 0; width: 7%">
              <input
                type="text"
                style="
                  border: none;
                  width: 95%;
                  height: 100%;
                  font-size: xx-small;
                  background-color: transparent;
                  text-align: center;
                "
                v-model="armorTypeRefs[index]"
              />
            </td>
            <td style="border: 1px solid black; padding: 0; width: 7%">
              <div style="display: flex">
                <input
                  type="text"
                  style="
                    border: none;
                    width: 50%;
                    height: 100%;
                    font-size: small;
                    background-color: transparent;
                    text-align: center;
                  "
                  v-model="armorSoakRefs[index][0]"
                />
                <input
                  type="text"
                  style="
                    border: none;
                    width: 50%;
                    height: 100%;
                    font-size: small;
                    background-color: transparent;
                    text-align: center;
                  "
                  v-model="armorSoakRefs[index][1]"
                />
              </div>
            </td>
            <td style="border: 1px solid black; padding: 0; width: 5%">
              <input
                type="text"
                style="
                  border: none;
                  width: 95%;
                  height: 100%;
                  font-size: small;
                  background-color: transparent;
                  text-align: center;
                "
                v-model="armorHardnessRefs[index]"
              />
            </td>
            <td style="border: 1px solid black; padding: 0; width: 7%">
              <input
                type="text"
                style="
                  border: none;
                  width: 95%;
                  height: 100%;
                  font-size: small;
                  background-color: transparent;
                  text-align: center;
                "
                v-model="armorFatigueRefs[index]"
              />
            </td>
            <td style="border: 1px solid black; padding: 0; width: 7%">
              <input
                type="text"
                style="
                  border: none;
                  width: 95%;
                  height: 100%;
                  font-size: small;
                  background-color: transparent;
                "
                v-model="armorMobilityRefs[index]"
              />
            </td>
            <td style="border: 1px solid black; padding: 0">
              <input
                type="text"
                style="
                  border: none;
                  width: 98%;
                  height: 100%;
                  font-size: xx-small;
                  background-color: transparent;
                "
                v-model="armorNotesRefs[index]"
              />
            </td>
            <td style="border: 1px solid black; padding: 0; width: 0.8in">
              <input
                type="checkbox"
                style="
                  border: none;
                  width: 98%;
                  height: 100%;
                  font-size: xx-small;
                  background-color: transparent;
                "
                :checked="armorEquippedRefs[index]"
                @change="
                  () => {
                    for (var j = 0; j < armorEquippedRefs.length; j++) {
                      armorEquippedRefs[j] =
                        j == index ? !armorEquippedRefs[j] : false;
                    }
                    console.log(armorEquippedRefs);
                  }
                "
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div class="full-bar-with-text">
        <img :src="fullBar" style="width: 7.5in" alt="bar" />
        <div style="padding-block: 0">In Combat</div>
      </div>
      <CombatInfo />
      <img :src="fullBar" style="width: 7.5in" alt="bar" />
    </div>

    <div class="page">
      <img :src="fullBar" style="width: 7.5in" alt="bar" />
      <div style="display: flex">
        <img :src="logo" style="height: 1in" alt="exalted-2e-logo" />
        <div style="width: 100%">
          <div style="display: flex; justify-content: center">Languages</div>
          <table style="width: 100%; border-collapse: collapse">
            <tbody style="font-size: small">
              <tr>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[0].value"
                      style="margin-block: 0"
                    />
                    Clawspeak
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[1].value"
                      style="margin-block: 0"
                    />
                    Seatongue
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[2].value"
                      style="margin-block: 0"
                    />
                    Old Realm
                  </div>
                </td>
                <td style="width: 1.75in">
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[3].value"
                      style="margin-block: 0"
                    />
                    <input
                      type="text"
                      v-model="languageRefs[3].name"
                      class="text-input"
                      style="width: 1.5in"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[4].value"
                      style="margin-block: 0"
                    />
                    Flametongue
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[5].value"
                      style="margin-block: 0"
                    />
                    Skytongue
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[6].value"
                      style="margin-block: 0"
                    />
                    High Realm
                  </div>
                </td>
                <td style="width: 1.75in">
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[7].value"
                      style="margin-block: 0"
                    />
                    <input
                      type="text"
                      v-model="languageRefs[7].name"
                      class="text-input"
                      style="width: 1.5in"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[8].value"
                      style="margin-block: 0"
                    />
                    Forest Tongue
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[9].value"
                      style="margin-block: 0"
                    />
                    Fair Folk
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[10].value"
                      style="margin-block: 0"
                    />
                    Low Realm
                  </div>
                </td>
                <td style="width: 1.75in">
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[11].value"
                      style="margin-block: 0"
                    />
                    <input
                      type="text"
                      v-model="languageRefs[11].name"
                      class="text-input"
                      style="width: 1.5in"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[12].value"
                      style="margin-block: 0"
                    />
                    Guild Cant
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[13].value"
                      style="margin-block: 0"
                    />
                    Demonic
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[14].value"
                      style="margin-block: 0"
                    />
                    Celestial
                  </div>
                </td>
                <td style="width: 1.75in">
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[15].value"
                      style="margin-block: 0"
                    />
                    <input
                      type="text"
                      v-model="languageRefs[15].name"
                      class="text-input"
                      style="width: 1.5in"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="full-bar-with-text">
        <img :src="fullBar" style="width: 7.5in" alt="bar" />
        <div style="padding-block: 0">Charms</div>
      </div>
      <table style="width: 100%; border-collapse: collapse">
        <thead>
          <tr style="text-align: left">
            <th>Charm</th>
            <th>Cost</th>
            <th>Duration</th>
            <th>Type</th>
            <th>Keywords</th>
            <th>Effect</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(val, index) in charmRefs">
            <tr
              :style="{ backgroundColor: index % 2 === 0 ? 'white' : '#eee' }"
            >
              <td
                style="
                  border: 1px solid black;
                  padding: 0;
                  width: 2in;
                  height: 14px;
                  line-height: 14px;
                "
              >
                <input
                  type="text"
                  style="
                    width: 100%;
                    height: 16px;
                    box-sizing: border-box;
                    border: none;
                    background: transparent;
                    font-size: x-small;
                  "
                  v-model="charmRefs[index].name"
                />
              </td>
              <td
                style="
                  border: 1px solid black;
                  padding: 0;
                  width: 0.5in;
                  height: 14px;
                  line-height: 14px;
                "
              >
                <input
                  type="text"
                  style="
                    width: 100%;
                    height: 16px;
                    box-sizing: border-box;
                    border: none;
                    background: transparent;
                    font-size: x-small;
                  "
                  v-model="charmRefs[index].cost"
                />
              </td>
              <td
                style="
                  border: 1px solid black;
                  padding: 0;
                  width: 0.6in;
                  height: 14px;
                  line-height: 14px;
                "
              >
                <input
                  type="text"
                  style="
                    width: 100%;
                    height: 16px;
                    box-sizing: border-box;
                    border: none;
                    background: transparent;
                    font-size: x-small;
                  "
                  v-model="charmRefs[index].duration"
                />
              </td>
              <td
                style="
                  border: 1px solid black;
                  padding: 0;
                  width: 0.6in;
                  height: 14px;
                  line-height: 14px;
                "
              >
                <input
                  type="text"
                  style="
                    width: 100%;
                    height: 16px;
                    box-sizing: border-box;
                    border: none;
                    background: transparent;
                    font-size: x-small;
                  "
                  v-model="charmRefs[index].type"
                />
              </td>
              <td
                rowspan="2"
                style="
                  border: 1px solid black;
                  padding: 0;
                  width: 0.8in;
                  height: 28px;
                  line-height: 28px;
                "
              >
                <textarea
                  style="
                    width: 100%;
                    height: 30px;
                    display: block;
                    resize: none;
                    border: none;
                    box-sizing: border-box;
                    background: transparent;
                    font-size: x-small;
                  "
                  v-model="charmRefs[index].keywords"
                ></textarea>
              </td>
              <td
                rowspan="2"
                style="
                  border: 1px solid black;
                  padding: 0;
                  width: 2.6in;
                  height: 28px;
                  line-height: 28px;
                "
              >
                <textarea
                  style="
                    width: 100%;
                    height: 30px;
                    display: block;
                    resize: none;
                    border: none;
                    box-sizing: border-box;
                    background: transparent;
                    font-size: x-small;
                  "
                  v-model="charmRefs[index].effect"
                ></textarea>
              </td>
            </tr>
            <tr style="height: 16px"></tr>
          </template>
        </tbody>
      </table>
      <img :src="fullBar" style="width: 7.5in" alt="bar" />
    </div>

    <div class="page">
      <img :src="fullBar" style="width: 7.5in" alt="bar" />
      <div style="display: flex">
        <img :src="logo" style="height: 1in" alt="exalted-2e-logo" />
        <div style="width: 100%">
          <div style="display: flex; justify-content: center">Languages</div>
          <table style="width: 100%; border-collapse: collapse">
            <tbody style="font-size: small">
              <tr>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[0].value"
                      style="margin-block: 0"
                    />
                    Clawspeak
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[1].value"
                      style="margin-block: 0"
                    />
                    Seatongue
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[2].value"
                      style="margin-block: 0"
                    />
                    Old Realm
                  </div>
                </td>
                <td style="width: 1.75in">
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[3].value"
                      style="margin-block: 0"
                    />
                    <input
                      type="text"
                      v-model="languageRefs[3].name"
                      class="text-input"
                      style="width: 1.5in"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[4].value"
                      style="margin-block: 0"
                    />
                    Flametongue
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[5].value"
                      style="margin-block: 0"
                    />
                    Skytongue
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[6].value"
                      style="margin-block: 0"
                    />
                    High Realm
                  </div>
                </td>
                <td style="width: 1.75in">
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[7].value"
                      style="margin-block: 0"
                    />
                    <input
                      type="text"
                      v-model="languageRefs[7].name"
                      class="text-input"
                      style="width: 1.5in"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[8].value"
                      style="margin-block: 0"
                    />
                    Forest Tongue
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[9].value"
                      style="margin-block: 0"
                    />
                    Fair Folk
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[10].value"
                      style="margin-block: 0"
                    />
                    Low Realm
                  </div>
                </td>
                <td style="width: 1.75in">
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[11].value"
                      style="margin-block: 0"
                    />
                    <input
                      type="text"
                      v-model="languageRefs[11].name"
                      class="text-input"
                      style="width: 1.5in"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[12].value"
                      style="margin-block: 0"
                    />
                    Guild Cant
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[13].value"
                      style="margin-block: 0"
                    />
                    Demonic
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[14].value"
                      style="margin-block: 0"
                    />
                    Celestial
                  </div>
                </td>
                <td style="width: 1.75in">
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[15].value"
                      style="margin-block: 0"
                    />
                    <input
                      type="text"
                      v-model="languageRefs[15].name"
                      class="text-input"
                      style="width: 1.5in"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="full-bar-with-text">
        <img :src="fullBar" style="width: 7.5in" alt="bar" />
        <div style="padding-block: 0">Combos</div>
      </div>
      <table style="width: 100%; border-collapse: collapse">
        <thead>
          <tr style="text-align: left">
            <th>Combo</th>
            <th>Cost</th>
            <th>Charms</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(val, index) in comboRefs">
            <tr
              :style="{ backgroundColor: index % 2 === 0 ? 'white' : '#eee' }"
            >
              <td
                style="
                  border: 1px solid black;
                  padding: 0;
                  width: 2in;
                  height: 14px;
                  line-height: 14px;
                "
              >
                <input
                  type="text"
                  style="
                    width: 100%;
                    height: 16px;
                    box-sizing: border-box;
                    border: none;
                    background: transparent;
                    font-size: x-small;
                  "
                  v-model="comboRefs[index].name"
                />
              </td>
              <td
                style="
                  border: 1px solid black;
                  padding: 0;
                  width: 1in;
                  height: 14px;
                  line-height: 14px;
                "
              >
                <input
                  type="text"
                  style="
                    width: 100%;
                    height: 16px;
                    box-sizing: border-box;
                    border: none;
                    background: transparent;
                    font-size: x-small;
                  "
                  v-model="comboRefs[index].cost"
                />
              </td>
              <td
                rowspan="2"
                style="
                  border: 1px solid black;
                  padding: 0;
                  width: 2.6in;
                  height: 28px;
                  line-height: 28px;
                "
              >
                <textarea
                  style="
                    width: 100%;
                    height: 30px;
                    display: block;
                    resize: none;
                    border: none;
                    box-sizing: border-box;
                    background: transparent;
                    font-size: x-small;
                  "
                  v-model="comboRefs[index].charms"
                ></textarea>
              </td>
            </tr>
            <tr style="height: 16px"></tr>
          </template>
        </tbody>
      </table>
      <img :src="fullBar" style="width: 7.5in" alt="bar" />
    </div>

    <div class="page">
      <img :src="fullBar" style="width: 7.5in" alt="bar" />
      <div style="display: flex">
        <img :src="logo" style="height: 1in" alt="exalted-2e-logo" />
        <div style="width: 100%">
          <div style="display: flex; justify-content: center">Languages</div>
          <table style="width: 100%; border-collapse: collapse">
            <tbody style="font-size: small">
              <tr>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[0].value"
                      style="margin-block: 0"
                    />
                    Clawspeak
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[1].value"
                      style="margin-block: 0"
                    />
                    Seatongue
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[2].value"
                      style="margin-block: 0"
                    />
                    Old Realm
                  </div>
                </td>
                <td style="width: 1.75in">
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[3].value"
                      style="margin-block: 0"
                    />
                    <input
                      type="text"
                      v-model="languageRefs[3].name"
                      class="text-input"
                      style="width: 1.5in"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[4].value"
                      style="margin-block: 0"
                    />
                    Flametongue
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[5].value"
                      style="margin-block: 0"
                    />
                    Skytongue
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[6].value"
                      style="margin-block: 0"
                    />
                    High Realm
                  </div>
                </td>
                <td style="width: 1.75in">
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[7].value"
                      style="margin-block: 0"
                    />
                    <input
                      type="text"
                      v-model="languageRefs[7].name"
                      class="text-input"
                      style="width: 1.5in"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[8].value"
                      style="margin-block: 0"
                    />
                    Forest Tongue
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[9].value"
                      style="margin-block: 0"
                    />
                    Fair Folk
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[10].value"
                      style="margin-block: 0"
                    />
                    Low Realm
                  </div>
                </td>
                <td style="width: 1.75in">
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[11].value"
                      style="margin-block: 0"
                    />
                    <input
                      type="text"
                      v-model="languageRefs[11].name"
                      class="text-input"
                      style="width: 1.5in"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[12].value"
                      style="margin-block: 0"
                    />
                    Guild Cant
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[13].value"
                      style="margin-block: 0"
                    />
                    Demonic
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[14].value"
                      style="margin-block: 0"
                    />
                    Celestial
                  </div>
                </td>
                <td style="width: 1.75in">
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[15].value"
                      style="margin-block: 0"
                    />
                    <input
                      type="text"
                      v-model="languageRefs[15].name"
                      class="text-input"
                      style="width: 1.5in"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="full-bar-with-text">
        <img :src="fullBar" style="width: 7.5in" alt="bar" />
        <div style="padding-block: 0">Sorcery</div>
      </div>
      <table style="width: 100%; border-collapse: collapse">
        <thead>
          <tr style="text-align: left">
            <th>Sorcery</th>
            <th>Cost</th>
            <th>Type</th>
            <th>Duration</th>
            <th>Target</th>
            <th>Effect</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(val, index) in sorceryRefs">
            <tr
              :style="{ backgroundColor: index % 2 === 0 ? 'white' : '#eee' }"
            >
              <td
                style="
                  border: 1px solid black;
                  padding: 0;
                  width: 2in;
                  height: 14px;
                  line-height: 14px;
                "
              >
                <input
                  type="text"
                  style="
                    width: 100%;
                    height: 16px;
                    box-sizing: border-box;
                    border: none;
                    background: transparent;
                    font-size: x-small;
                  "
                  v-model="sorceryRefs[index].name"
                />
              </td>
              <td
                style="
                  border: 1px solid black;
                  padding: 0;
                  width: 0.5in;
                  height: 14px;
                  line-height: 14px;
                "
              >
                <input
                  type="text"
                  style="
                    width: 100%;
                    height: 16px;
                    box-sizing: border-box;
                    border: none;
                    background: transparent;
                    font-size: x-small;
                  "
                  v-model="sorceryRefs[index].cost"
                />
              </td>
              <td
                style="
                  border: 1px solid black;
                  padding: 0;
                  width: 0.6in;
                  height: 14px;
                  line-height: 14px;
                "
              >
                <input
                  type="text"
                  style="
                    width: 100%;
                    height: 16px;
                    box-sizing: border-box;
                    border: none;
                    background: transparent;
                    font-size: x-small;
                  "
                  v-model="sorceryRefs[index].type"
                />
              </td>
              <td
                rowspan="2"
                style="
                  border: 1px solid black;
                  padding: 0;
                  width: 0.8in;
                  height: 28px;
                  line-height: 28px;
                "
              >
                <textarea
                  style="
                    width: 100%;
                    height: 30px;
                    display: block;
                    resize: none;
                    border: none;
                    box-sizing: border-box;
                    background: transparent;
                    font-size: x-small;
                  "
                  v-model="sorceryRefs[index].duration"
                ></textarea>
              </td>
              <td
                rowspan="2"
                style="
                  border: 1px solid black;
                  padding: 0;
                  width: 0.8in;
                  height: 28px;
                  line-height: 28px;
                "
              >
                <textarea
                  style="
                    width: 100%;
                    height: 30px;
                    display: block;
                    resize: none;
                    border: none;
                    box-sizing: border-box;
                    background: transparent;
                    font-size: x-small;
                  "
                  v-model="sorceryRefs[index].target"
                ></textarea>
              </td>
              <td
                rowspan="2"
                style="
                  border: 1px solid black;
                  padding: 0;
                  width: 2.6in;
                  height: 28px;
                  line-height: 28px;
                "
              >
                <textarea
                  style="
                    width: 100%;
                    height: 30px;
                    display: block;
                    resize: none;
                    border: none;
                    box-sizing: border-box;
                    background: transparent;
                    font-size: x-small;
                  "
                  v-model="sorceryRefs[index].effect"
                ></textarea>
              </td>
            </tr>
            <tr style="height: 16px"></tr>
          </template>
        </tbody>
      </table>
      <img :src="fullBar" style="width: 7.5in" alt="bar" />
    </div>

    <div class="page">
      <img :src="fullBar" style="width: 7.5in" alt="bar" />
      <div style="display: flex">
        <img :src="logo" style="height: 1in" alt="exalted-2e-logo" />
        <div style="width: 100%">
          <div style="display: flex; justify-content: center">Languages</div>
          <table style="width: 100%; border-collapse: collapse">
            <tbody style="font-size: small">
              <tr>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[0].value"
                      style="margin-block: 0"
                    />
                    Clawspeak
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[1].value"
                      style="margin-block: 0"
                    />
                    Seatongue
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[2].value"
                      style="margin-block: 0"
                    />
                    Old Realm
                  </div>
                </td>
                <td style="width: 1.75in">
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[3].value"
                      style="margin-block: 0"
                    />
                    <input
                      type="text"
                      v-model="languageRefs[3].name"
                      class="text-input"
                      style="width: 1.5in"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[4].value"
                      style="margin-block: 0"
                    />
                    Flametongue
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[5].value"
                      style="margin-block: 0"
                    />
                    Skytongue
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[6].value"
                      style="margin-block: 0"
                    />
                    High Realm
                  </div>
                </td>
                <td style="width: 1.75in">
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[7].value"
                      style="margin-block: 0"
                    />
                    <input
                      type="text"
                      v-model="languageRefs[7].name"
                      class="text-input"
                      style="width: 1.5in"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[8].value"
                      style="margin-block: 0"
                    />
                    Forest Tongue
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[9].value"
                      style="margin-block: 0"
                    />
                    Fair Folk
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[10].value"
                      style="margin-block: 0"
                    />
                    Low Realm
                  </div>
                </td>
                <td style="width: 1.75in">
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[11].value"
                      style="margin-block: 0"
                    />
                    <input
                      type="text"
                      v-model="languageRefs[11].name"
                      class="text-input"
                      style="width: 1.5in"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[12].value"
                      style="margin-block: 0"
                    />
                    Guild Cant
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[13].value"
                      style="margin-block: 0"
                    />
                    Demonic
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[14].value"
                      style="margin-block: 0"
                    />
                    Celestial
                  </div>
                </td>
                <td style="width: 1.75in">
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[15].value"
                      style="margin-block: 0"
                    />
                    <input
                      type="text"
                      v-model="languageRefs[15].name"
                      class="text-input"
                      style="width: 1.5in"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="full-bar-with-text">
        <img :src="fullBar" style="width: 7.5in" alt="bar" />
        <div style="padding-block: 0">Artifacts & Panoply</div>
      </div>
      <table style="width: 100%; border-collapse: collapse">
        <thead>
          <tr style="text-align: left">
            <th>Rating</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(val, index) in artifactRefs">
            <tr
              :style="{ backgroundColor: index % 2 === 0 ? 'white' : '#eee' }"
            >
              <td
                style="
                  border: none;
                  padding: 0;
                  padding-right: 0.05in;
                  width: 0.5in;
                  height: 14px;
                  line-height: 14px;
                "
              >
                <FiveDotWonder
                  :source="`artifact${index}`"
                  :value="artifactRefs[index].rating"
                  :onUpdate="
                    (value) => {
                      artifactRefs[index].rating = value;
                    }
                  "
                />
              </td>
              <td
                style="
                  border: 1px solid black;
                  padding: 0;
                  width: 1.75in;
                  height: 14px;
                  line-height: 14px;
                "
              >
                <input
                  type="text"
                  style="
                    width: 100%;
                    height: 16px;
                    box-sizing: border-box;
                    border: none;
                    background: transparent;
                    font-size: x-small;
                  "
                  v-model="artifactRefs[index].name"
                />
              </td>
              <td
                rowspan="2"
                style="
                  border: 1px solid black;
                  padding: 0;
                  width: 4.5in;
                  height: 28px;
                  line-height: 28px;
                "
              >
                <textarea
                  style="
                    width: 100%;
                    height: 30px;
                    display: block;
                    resize: none;
                    border: none;
                    box-sizing: border-box;
                    background: transparent;
                    font-size: x-small;
                  "
                  v-model="artifactRefs[index].description"
                ></textarea>
              </td>
            </tr>
            <tr style="height: 16px"></tr>
          </template>
        </tbody>
      </table>
      <img :src="fullBar" style="width: 7.5in" alt="bar" />
    </div>

    <div class="page">
      <img :src="fullBar" style="width: 7.5in" alt="bar" />
      <div style="display: flex">
        <img :src="logo" style="height: 1in" alt="exalted-2e-logo" />
        <div style="width: 100%">
          <div style="display: flex; justify-content: center">Languages</div>
          <table style="width: 100%; border-collapse: collapse">
            <tbody style="font-size: small">
              <tr>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[0].value"
                      style="margin-block: 0"
                    />
                    Clawspeak
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[1].value"
                      style="margin-block: 0"
                    />
                    Seatongue
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[2].value"
                      style="margin-block: 0"
                    />
                    Old Realm
                  </div>
                </td>
                <td style="width: 1.75in">
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[3].value"
                      style="margin-block: 0"
                    />
                    <input
                      type="text"
                      v-model="languageRefs[3].name"
                      class="text-input"
                      style="width: 1.5in"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[4].value"
                      style="margin-block: 0"
                    />
                    Flametongue
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[5].value"
                      style="margin-block: 0"
                    />
                    Skytongue
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[6].value"
                      style="margin-block: 0"
                    />
                    High Realm
                  </div>
                </td>
                <td style="width: 1.75in">
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[7].value"
                      style="margin-block: 0"
                    />
                    <input
                      type="text"
                      v-model="languageRefs[7].name"
                      class="text-input"
                      style="width: 1.5in"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[8].value"
                      style="margin-block: 0"
                    />
                    Forest Tongue
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[9].value"
                      style="margin-block: 0"
                    />
                    Fair Folk
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[10].value"
                      style="margin-block: 0"
                    />
                    Low Realm
                  </div>
                </td>
                <td style="width: 1.75in">
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[11].value"
                      style="margin-block: 0"
                    />
                    <input
                      type="text"
                      v-model="languageRefs[11].name"
                      class="text-input"
                      style="width: 1.5in"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[12].value"
                      style="margin-block: 0"
                    />
                    Guild Cant
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[13].value"
                      style="margin-block: 0"
                    />
                    Demonic
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[14].value"
                      style="margin-block: 0"
                    />
                    Celestial
                  </div>
                </td>
                <td style="width: 1.75in">
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[15].value"
                      style="margin-block: 0"
                    />
                    <input
                      type="text"
                      v-model="languageRefs[15].name"
                      class="text-input"
                      style="width: 1.5in"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="full-bar-with-text">
        <img :src="fullBar" style="width: 7.5in" alt="bar" />
        <div style="padding-block: 0">Manse & Heathstones</div>
      </div>
      <table style="width: 100%; border-collapse: collapse">
        <thead>
          <tr style="text-align: left">
            <th>Rating</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(val, index) in artifactRefs">
            <tr
              :style="{ backgroundColor: index % 2 === 0 ? 'white' : '#eee' }"
            >
              <td
                style="
                  border: none;
                  padding: 0;
                  padding-right: 0.05in;
                  width: 0.5in;
                  height: 14px;
                  line-height: 14px;
                "
              >
                <FiveDotWonder
                  :source="`artifact${index}`"
                  :value="artifactRefs[index].rating"
                  :onUpdate="
                    (value) => {
                      manseRefs[index].rating = value;
                    }
                  "
                />
              </td>
              <td
                style="
                  border: 1px solid black;
                  padding: 0;
                  width: 1.75in;
                  height: 14px;
                  line-height: 14px;
                "
              >
                <input
                  type="text"
                  style="
                    width: 100%;
                    height: 16px;
                    box-sizing: border-box;
                    border: none;
                    background: transparent;
                    font-size: x-small;
                  "
                  v-model="manseRefs[index].name"
                />
              </td>
              <td
                rowspan="2"
                style="
                  border: 1px solid black;
                  padding: 0;
                  width: 4.5in;
                  height: 28px;
                  line-height: 28px;
                "
              >
                <textarea
                  style="
                    width: 100%;
                    height: 30px;
                    display: block;
                    resize: none;
                    border: none;
                    box-sizing: border-box;
                    background: transparent;
                    font-size: x-small;
                  "
                  v-model="manseRefs[index].description"
                ></textarea>
              </td>
            </tr>
            <tr style="height: 16px"></tr>
          </template>
        </tbody>
      </table>
      <img :src="fullBar" style="width: 7.5in" alt="bar" />
    </div>

    <div class="page">
      <img :src="fullBar" style="width: 7.5in" alt="bar" />
      <div style="display: flex">
        <img :src="logo" style="height: 1in" alt="exalted-2e-logo" />
        <div style="width: 100%">
          <div style="display: flex; justify-content: center">Languages</div>
          <table style="width: 100%; border-collapse: collapse">
            <tbody style="font-size: small">
              <tr>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[0].value"
                      style="margin-block: 0"
                    />
                    Clawspeak
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[1].value"
                      style="margin-block: 0"
                    />
                    Seatongue
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[2].value"
                      style="margin-block: 0"
                    />
                    Old Realm
                  </div>
                </td>
                <td style="width: 1.75in">
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[3].value"
                      style="margin-block: 0"
                    />
                    <input
                      type="text"
                      v-model="languageRefs[3].name"
                      class="text-input"
                      style="width: 1.5in"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[4].value"
                      style="margin-block: 0"
                    />
                    Flametongue
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[5].value"
                      style="margin-block: 0"
                    />
                    Skytongue
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[6].value"
                      style="margin-block: 0"
                    />
                    High Realm
                  </div>
                </td>
                <td style="width: 1.75in">
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[7].value"
                      style="margin-block: 0"
                    />
                    <input
                      type="text"
                      v-model="languageRefs[7].name"
                      class="text-input"
                      style="width: 1.5in"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[8].value"
                      style="margin-block: 0"
                    />
                    Forest Tongue
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[9].value"
                      style="margin-block: 0"
                    />
                    Fair Folk
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[10].value"
                      style="margin-block: 0"
                    />
                    Low Realm
                  </div>
                </td>
                <td style="width: 1.75in">
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[11].value"
                      style="margin-block: 0"
                    />
                    <input
                      type="text"
                      v-model="languageRefs[11].name"
                      class="text-input"
                      style="width: 1.5in"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[12].value"
                      style="margin-block: 0"
                    />
                    Guild Cant
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[13].value"
                      style="margin-block: 0"
                    />
                    Demonic
                  </div>
                </td>
                <td>
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[14].value"
                      style="margin-block: 0"
                    />
                    Celestial
                  </div>
                </td>
                <td style="width: 1.75in">
                  <div style="display: flex">
                    <input
                      type="checkbox"
                      v-model="languageRefs[15].value"
                      style="margin-block: 0"
                    />
                    <input
                      type="text"
                      v-model="languageRefs[15].name"
                      class="text-input"
                      style="width: 1.5in"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="full-bar-with-text">
        <img :src="fullBar" style="width: 7.5in" alt="bar" />
        <div style="padding-block: 0">Backgrounds</div>
      </div>

      <div
        style="
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-top: 0.05in;
        "
      >
        <datalist id="background-options">
          <option
            v-for="value in exaltData[exaltTypeRef].backgrounds"
            :value="value"
          >
            {{ value }}
          </option>
        </datalist>
        <div
          v-for="(value, index) in backgroundRefs"
          style="max-width: 48.5%; width: 100%"
        >
          <div style="display: flex; justify-content: space-between">
            <div style="display: flex">
              <input
                v-model="backgroundRefs[index].name"
                list="background-options"
                style="width: 2in"
              />
            </div>
            <SixDotBackground
              :value="backgroundRefs[index].rating"
              :onUpdate="(val) => (backgroundRefs[index].rating = val)"
              :source="`background${index}`"
            />
          </div>
          <textarea
            style="
              height: 0.6in;
              box-sizing: border-box;
              width: 100%;
              resize: none;
            "
          ></textarea>
        </div>
      </div>

      <img :src="fullBar" style="width: 7.5in" alt="bar" />
    </div>

    <div class="page" id="final-page">
      <img :src="fullBar" style="width: 7.5in" alt="bar" />
      <div style="display: flex">
        <img :src="logo" style="height: 1in" alt="exalted-2e-logo" />
        <div style="width: 100%">
          <div style="display: flex; justify-content: center">Possessions</div>
          <textarea
            v-model="possessionsRef"
            style="
              width: 95%;
              height: 0.8in;
              box-sizing: border-box;
              margin-left: 0.1in;
              resize: none;
            "
          ></textarea>
        </div>
      </div>
      <div style="display: flex; justify-content: space-between">
        <div style="max-width: 48.5%; width: 100%">
          <div class="full-bar-with-text">
            <img :src="halfBar" style="width: 100%; height: 11px" alt="bar" />
            <div style="padding-block: 0">Experience</div>
          </div>
          <div style="display: flex">
            Total:
            <input
              type="text"
              v-model="totalXpRef"
              class="text-input"
              style="width: 0.5in"
            />
          </div>
          <div style="display: flex">
            Total Spent:
            <input
              type="text"
              v-model="totalXpSpentRef"
              class="text-input"
              style="width: 0.5in"
            />
          </div>
          <div style="display: flex; width: 100%; justify-content: center">
            Spent On
          </div>
          <textarea
            v-model="xpSpentOnRef"
            style="
              width: 100%;
              height: 5in;
              box-sizing: border-box;
              resize: none;
            "
          ></textarea>
        </div>
        <div style="max-width: 48.5%; width: 100%">
          <div class="full-bar-with-text">
            <img :src="halfBar" style="width: 100%; height: 11px" alt="bar" />
            <div style="padding-block: 0">Description</div>
          </div>
          <div
            style="display: flex; width: 100%; justify-content: space-between"
          >
            <div>
              Age (actual):
              <input
                type="text"
                v-model="ageActualRef"
                class="text-input"
                style="width: 0.4in"
              />
            </div>
            <div>
              Age (apparent):
              <input
                type="text"
                v-model="ageApparentRef"
                class="text-input"
                style="width: 0.4in"
              />
            </div>
          </div>

          <div
            style="display: flex; width: 100%; justify-content: space-between"
          >
            <div>
              Height:
              <input
                type="text"
                v-model="heightRef"
                class="text-input"
                style="width: 0.6in"
              />
            </div>
            <div>
              Weight:
              <input
                type="text"
                v-model="weightRef"
                class="text-input"
                style="width: 0.6in"
              />
            </div>
          </div>

          <div
            style="display: flex; width: 100%; justify-content: space-between"
          >
            <div>
              Gender:
              <input
                type="text"
                v-model="genderRef"
                class="text-input"
                style="width: 1in"
              />
            </div>
            <div>
              Eye Color:
              <input
                type="text"
                v-model="eyeColorRef"
                class="text-input"
                style="width: 1in"
              />
            </div>
          </div>

          <div
            style="display: flex; width: 100%; justify-content: space-between"
          >
            <div>
              Hair Color:
              <input
                type="text"
                v-model="hairColorRef"
                class="text-input"
                style="width: 1in"
              />
            </div>
            <div>
              Skin:
              <input
                type="text"
                v-model="skinRef"
                class="text-input"
                style="width: 1in"
              />
            </div>
          </div>

          <div
            style="display: flex; width: 100%; justify-content: space-between"
          >
            <div>
              Homeland:
              <input
                type="text"
                v-model="homelandRef"
                class="text-input"
                style="width: 2in"
              />
            </div>
          </div>

          <div class="full-bar-with-text">
            <img
              :src="halfBar"
              style="width: 100%; height: 11px; margin-top: 0.1in"
              alt="bar"
            />
            <div style="padding-block: 0">Picture</div>
          </div>
          <div style="display: flex; justify-content: center">
            <img
              :src="playerImageBase64"
              style="
                max-width: 100%;
                max-height: 4in;
                border: 1px solid #ccc;
                padding: 4px;
                box-sizing: border-box;
              "
              :style="{ display: playerImageBase64 === '' ? 'none' : 'block' }"
            />
          </div>
          <div style="display: flex; justify-content: center">
            <input
              type="file"
              accept="image/*"
              @change="onImageUpload"
              id="selectedFile"
              style="display: none"
            />
            <input
              type="button"
              value="Choose File"
              onclick="document.getElementById('selectedFile').click()"
              style="margin-top: 0.05in"
              id="selectImageButton"
            />
          </div>
        </div>
      </div>

      <div class="full-bar-with-text">
        <img :src="fullBar" style="width: 7.5in" alt="bar" />
        <div style="padding-block: 0">Backstory</div>
      </div>

      <textarea
        v-model="backstoryRef"
        style="
          width: 7.5in;
          height: 2.5in;
          box-sizing: border-box;
          resize: none;
        "
      ></textarea>

      <img :src="fullBar" style="width: 7.5in" alt="bar" />
    </div>
  </div>
</template>

<script setup>
import fullBar from "@/assets/img/full-length-bar-2e.png";
import halfBar from "@/assets/img/one-column-bar-split-2e.png";
import logo from "@/assets/img/exalted-2e-logo.jpg";
import driveOpenIcon from "@/assets/img/drive-open.svg";
import driveSaveIcon from "@/assets/img/drive-save.svg";
import saveFileIcon from "@/assets/img/file_save.svg";
import uploadFileIcon from "@/assets/img/upload_file.svg";
import printIcon from "@/assets/img/print.svg";
import FiveDotRadio from "./components/FiveDotRadio.vue";
import FiveDotWonder from "./components/FiveDotWonder.vue";
import { ref, watch, computed, toRaw } from "vue";
import ThreeDotRadio from "./components/ThreeDotRadio.vue";
import HealthLevelRow from "./components/HealthLevelRow.vue";
import { exaltData } from "./exalt-data";
import ThreeDotEssence from "./components/ThreeDotEssence.vue";
import WillpowerDots from "./components/WillpowerDots.vue";
import VirtueDots from "./components/VirtueDots.vue";
import LimitPoints from "./components/LimitPoints.vue";
import SocialCombatInfo from "./components/SocialCombatInfo.vue";

const pickerApiLoaded = ref(false);
const developerKey = "AIzaSyDSjm_zgeBR5OzXh8RHUjo7aFHl-1KDaBk"; //Google project API key
const clientId =
  "1084606237071-t97gt0austpi801grths76ph6pmsuqab.apps.googleusercontent.com"; //Google project OAuth Client ID
const scope = "https://www.googleapis.com/auth/drive.file";
const oauthToken = ref(null);
const fileId = ref(null);

const route = useRoute();
const router = useRoute();
const sheetSourceURI = ref(route.query.src || "");

const characterNameRef = ref("");
const playerNameRef = ref("");
const exaltTypeRef = ref("solar");
const casteRef = ref("");
const strengthRef = ref(1);
const dexterityRef = ref(1);
const staminaRef = ref(1);
const charismaRef = ref(1);
const manipulationRef = ref(1);
const appearanceRef = ref(1);
const perceptionRef = ref(1);
const intelligenceRef = ref(1);
const witsRef = ref(1);

const abilityScoreRefs = ref({
  archery: 0,
  "martial-arts": 0,
  melee: 0,
  thrown: 0,
  war: 0,
  integrity: 0,
  performance: 0,
  presence: 0,
  resistance: 0,
  survival: 0,
  craft: 0,
  investigation: 0,
  lore: 0,
  medicine: 0,
  occult: 0,
  athletics: 0,
  awareness: 0,
  dodge: 0,
  larceny: 0,
  stealth: 0,
  bureaucracy: 0,
  linguistics: 0,
  ride: 0,
  sail: 0,
  socialize: 0,
});

const essenceRef = ref(1);

const healthRef = ref(exaltData[exaltTypeRef.value].health);

const specialtyRefs = ref([
  { dots: 0, name: "" },
  { dots: 0, name: "" },
  { dots: 0, name: "" },
  { dots: 0, name: "" },
  { dots: 0, name: "" },
  { dots: 0, name: "" },
  { dots: 0, name: "" },
  { dots: 0, name: "" },
  { dots: 0, name: "" },
  { dots: 0, name: "" },
  { dots: 0, name: "" },
  { dots: 0, name: "" },
  { dots: 0, name: "" },
  { dots: 0, name: "" },
  { dots: 0, name: "" },
  { dots: 0, name: "" },
  { dots: 0, name: "" },
  { dots: 0, name: "" },
  { dots: 0, name: "" },
  { dots: 0, name: "" },
  { dots: 0, name: "" },
  { dots: 0, name: "" },
]);

const willpowerPermRef = ref(1);
const willpowerTempRef = ref(0);

const compassionPermRef = ref(1);
const compassionTempRef = ref(0);
const temperancePermRef = ref(1);
const temperanceTempRef = ref(0);
const convictionPermRef = ref(1);
const convictionTempRef = ref(0);
const valorPermRef = ref(1);
const valorTempRef = ref(0);

const virtueFlawRef = ref("");
const limitBreakDurationRef = ref("");
const limitBreakConditionRef = ref("");
const partialControlRef = ref("");
const noControlRef = ref("");
const primaryVirtueRef = ref("");
const yoziPatronRef = ref("");
const tormentRef = ref("");
const abscissicPlate = ref("");
const abscissicCondition = ref("");

const limitRef = ref(0);

const weaponNameRefs = ref([
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "Clinch",
  "Kick",
  "Punch",
]);

const weaponSpeedRefs = ref([
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "6",
  "5",
  "5",
]);

const weaponAccRefs = ref([
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
]);

const weaponAccBonusRefs = ref([
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+1)",
]);

const weaponDamageRefs = ref([
  { value: "0B", calculate: true },
  { value: "0B", calculate: true },
  { value: "0B", calculate: true },
  { value: "0B", calculate: true },
  { value: "0B", calculate: true },
  { value: "0B", calculate: true },
  { value: "0B", calculate: true },
  { value: "0B", calculate: true },
  { value: "0B", calculate: true },
  { value: "0B", calculate: true },
  { value: "0B", calculate: true },
  { value: "0B", calculate: true },
  { value: "0B", calculate: true },
  { value: "0B", calculate: true },
  { value: "0B", calculate: true },
]);

const weaponDamageBonusRefs = ref([
  "(+0B)",
  "(+0B)",
  "(+0B)",
  "(+0B)",
  "(+0B)",
  "(+0B)",
  "(+0B)",
  "(+0B)",
  "(+0B)",
  "(+0B)",
  "(+0B)",
  "(+0B)",
  "(+0B)",
  "(+3B)",
  "(+0B)",
]);

const weaponPdvRefs = ref([
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
]);

const weaponPdvBonusRefs = ref([
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(-2)",
  "(+2)",
]);

const weaponRateRefs = ref([
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "1",
  "2",
  "3",
]);

const weaponRangeRefs = ref([
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
]);

const weaponTagRefs = ref([
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
]);

const weaponNotesRefs = ref([
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
]);

const weaponTypeRefs = ref([
  "melee",
  "melee",
  "melee",
  "melee",
  "melee",
  "melee",
  "melee",
  "melee",
  "melee",
  "melee",
  "melee",
  "melee",
  "martial-arts",
  "martial-arts",
  "martial-arts",
]);

const armorNameRefs = ref(["", "", "", "", "", "", "", ""]);

const armorTypeRefs = ref(["", "", "", "", "", "", "", ""]);

const armorSoakRefs = ref([
  ["0", "0"],
  ["", ""],
  ["", ""],
  ["", ""],
  ["", ""],
  ["", ""],
  ["", ""],
  ["", ""],
]);

const armorHardnessRefs = ref(["", "", "", "", "", "", "", ""]);

const armorFatigueRefs = ref(["", "", "", "", "", "", "", ""]);

const armorMobilityRefs = ref(["", "", "", "", "", "", "", ""]);

const armorNotesRefs = ref(["", "", "", "", "", "", "", ""]);

const armorEquippedRefs = ref([
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
]);

const languageRefs = ref([
  { name: "clawspeak", value: false },
  { name: "seatongue", value: false },
  { name: "old-realm", value: false },
  { name: "", value: false },

  { name: "flametongue", value: false },
  { name: "skytongue", value: false },
  { name: "high-realm", value: false },
  { name: "", value: false },

  { name: "forest-tongue", value: false },
  { name: "fair-folk", value: false },
  { name: "low-realm", value: false },
  { name: "", value: false },

  { name: "guild-cant", value: false },
  { name: "demonic", value: false },
  { name: "celestial", value: false },
  { name: "", value: false },
]);

const charmRefs = ref([
  { name: "", cost: "", duration: "", type: "", keywords: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", keywords: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", keywords: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", keywords: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", keywords: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", keywords: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", keywords: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", keywords: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", keywords: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", keywords: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", keywords: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", keywords: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", keywords: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", keywords: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", keywords: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", keywords: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", keywords: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", keywords: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", keywords: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", keywords: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", keywords: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", keywords: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", keywords: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", keywords: "", effect: "" },
]);

const comboRefs = ref([
  { name: "", cost: "", charms: "" },
  { name: "", cost: "", charms: "" },
  { name: "", cost: "", charms: "" },
  { name: "", cost: "", charms: "" },
  { name: "", cost: "", charms: "" },
  { name: "", cost: "", charms: "" },
  { name: "", cost: "", charms: "" },
  { name: "", cost: "", charms: "" },
  { name: "", cost: "", charms: "" },
  { name: "", cost: "", charms: "" },
  { name: "", cost: "", charms: "" },
  { name: "", cost: "", charms: "" },
  { name: "", cost: "", charms: "" },
  { name: "", cost: "", charms: "" },
  { name: "", cost: "", charms: "" },
  { name: "", cost: "", charms: "" },
  { name: "", cost: "", charms: "" },
  { name: "", cost: "", charms: "" },
  { name: "", cost: "", charms: "" },
  { name: "", cost: "", charms: "" },
  { name: "", cost: "", charms: "" },
  { name: "", cost: "", charms: "" },
  { name: "", cost: "", charms: "" },
  { name: "", cost: "", charms: "" },
]);

const sorceryRefs = ref([
  { name: "", cost: "", duration: "", type: "", target: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", target: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", target: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", target: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", target: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", target: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", target: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", target: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", target: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", target: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", target: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", target: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", target: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", target: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", target: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", target: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", target: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", target: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", target: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", target: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", target: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", target: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", target: "", effect: "" },
  { name: "", cost: "", duration: "", type: "", target: "", effect: "" },
]);

const artifactRefs = ref([
  { name: "", rating: "", description: "" },
  { name: "", rating: "", description: "" },
  { name: "", rating: "", description: "" },
  { name: "", rating: "", description: "" },
  { name: "", rating: "", description: "" },
  { name: "", rating: "", description: "" },
  { name: "", rating: "", description: "" },
  { name: "", rating: "", description: "" },
  { name: "", rating: "", description: "" },
  { name: "", rating: "", description: "" },
  { name: "", rating: "", description: "" },
  { name: "", rating: "", description: "" },
  { name: "", rating: "", description: "" },
  { name: "", rating: "", description: "" },
  { name: "", rating: "", description: "" },
  { name: "", rating: "", description: "" },
  { name: "", rating: "", description: "" },
  { name: "", rating: "", description: "" },
  { name: "", rating: "", description: "" },
  { name: "", rating: "", description: "" },
  { name: "", rating: "", description: "" },
  { name: "", rating: "", description: "" },
  { name: "", rating: "", description: "" },
  { name: "", rating: "", description: "" },
]);

const manseRefs = ref([
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
]);

const backgroundRefs = ref([
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
  { name: "", rating: 0, description: "" },
]);

const possessionsRef = ref("");

const totalXpRef = ref(0);
const totalXpSpentRef = ref(0);
const xpSpentOnRef = ref("");

const ageActualRef = ref(0);
const ageApparentRef = ref(0);
const heightRef = ref("");
const weightRef = ref("");
const genderRef = ref("");
const eyeColorRef = ref("");
const hairColorRef = ref("");
const homelandRef = ref("");
const skinRef = ref("");

const playerImageBase64 = ref("");

const backstoryRef = ref("");

function onImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    playerImageBase64.value = reader.result;
  };

  reader.readAsDataURL(file);
}

function openPrintDialog() {
  window.print();
}

// watch(abilityScoreRefs, () => {
//   console.log(`Integrity: ${abilityScoreRefs.value.integrity}`);
// });

const animaEffectsComputed = computed(() => {
  if (exaltTypeRef.value === "heroic-mortal") return "";
  return exaltData[exaltTypeRef.value].animaEffects
    .concat(
      casteRef.value === ""
        ? null
        : exaltData[exaltTypeRef.value].casteAnimaEffects[casteRef.value]
    )
    .join("\n");
});

const dodgeMdvComputed = computed(() => {
  var mdv =
    (willpowerPermRef.value +
      abilityScoreRefs.value["integrity"] +
      essenceRef.value) /
    2;
  return Number.isInteger(mdv) ? mdv : Math.ceil(mdv) + ".";
});

const dodgeDvComputed = computed(() => {
  var dv =
    (dexterityRef.value + abilityScoreRefs.value["dodge"] + essenceRef.value) /
    2;
  return Number.isInteger(dv) ? dv : Math.ceil(dv) + ".";
});

const joinCombatComputed = computed(() => {
  return witsRef.value + abilityScoreRefs.value["awareness"];
});

// watch(dodgeMdvComputed, () => console.log(dodgeMdvComputed.value));

watch(sheetSourceURI, (newSrc) => {
  router.push({
    query: { ...route.query, src: newSrc },
  });
});

watch(
  () => route.query.src,
  (newSrc) => {
    if (newSrc !== sheetSourceURI.value) {
      sheetSourceURI.value = newSrc || "";
    }
  }
);

watch(exaltTypeRef, () => {
  healthRef.value = exaltData[exaltTypeRef.value].health;
});

watch(virtueFlawRef, () => {
  if (
    Object.keys(exaltData[exaltTypeRef.value].virtueFlaws).includes(
      virtueFlawRef.value
    )
  ) {
    limitBreakDurationRef.value =
      exaltData[exaltTypeRef.value].virtueFlaws[virtueFlawRef.value].duration;
    limitBreakConditionRef.value =
      exaltData[exaltTypeRef.value].virtueFlaws[virtueFlawRef.value].limitBreak;
    partialControlRef.value =
      exaltData[exaltTypeRef.value].virtueFlaws[
        virtueFlawRef.value
      ].partialControl;
    noControlRef.value =
      exaltData[exaltTypeRef.value].virtueFlaws[virtueFlawRef.value].noControl;
  }
});

watch(primaryVirtueRef, () => {
  if (
    Object.keys(exaltData[exaltTypeRef.value].virtues).includes(
      primaryVirtueRef.value
    )
  ) {
    limitBreakDurationRef.value =
      exaltData[exaltTypeRef.value].virtues[primaryVirtueRef.value].duration;
    limitBreakConditionRef.value =
      exaltData[exaltTypeRef.value].virtues[primaryVirtueRef.value].limitBreak;
    partialControlRef.value =
      exaltData[exaltTypeRef.value].virtues[
        primaryVirtueRef.value
      ].partialControl;
    noControlRef.value =
      exaltData[exaltTypeRef.value].virtues[primaryVirtueRef.value].noControl;
  }
});

watch(
  [weaponAccBonusRefs, dexterityRef, abilityScoreRefs],
  () => {
    for (var i = 0; i < weaponAccBonusRefs.value.length; i++) {
      if (
        !Number.isNaN(bonusToInt(weaponAccBonusRefs.value[i])) &&
        weaponAccRefs.value[i].calculate
      ) {
        weaponAccRefs.value[i].value =
          parseInt(dexterityRef.value) +
          parseInt(abilityScoreRefs.value[weaponTypeRefs.value[i]]) +
          bonusToInt(weaponAccBonusRefs.value[i]);
      }
    }
  },
  { deep: true }
);

watch(
  [weaponDamageBonusRefs, strengthRef],
  () => {
    for (var i = 0; i < weaponDamageBonusRefs.value.length; i++) {
      if (
        !Number.isNaN(bonusToInt(weaponDamageBonusRefs.value[i])) &&
        weaponDamageRefs.value[i].calculate
      ) {
        var dmg =
          parseInt(strengthRef.value) +
          bonusToInt(weaponDamageBonusRefs.value[i]);
        weaponDamageRefs.value[i].value = `${dmg}${
          weaponDamageBonusRefs.value[i].split("/")[0].includes("A")
            ? "A"
            : weaponDamageBonusRefs.value[i].split("/")[0].includes("L")
            ? "L"
            : "B"
        }`;
      }
    }
  },
  { deep: true }
);

watch(
  [weaponPdvBonusRefs, dexterityRef, abilityScoreRefs],
  () => {
    for (var i = 0; i < weaponPdvBonusRefs.value.length; i++) {
      if (
        !Number.isNaN(bonusToInt(weaponPdvBonusRefs.value[i])) &&
        weaponPdvRefs.value[i].calculate
      ) {
        var pdv =
          (parseInt(dexterityRef.value) +
            parseInt(abilityScoreRefs.value[weaponTypeRefs.value[i]]) +
            bonusToInt(weaponPdvBonusRefs.value[i])) /
          2;
        weaponPdvRefs.value[i].value = Number.isInteger(pdv)
          ? pdv
          : Math.ceil(pdv) + ".";
      }
    }
  },
  { deep: true }
);

function bonusToInt(string) {
  return parseInt(
    string
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll("+", "")
      .split("/")[0]
      .replaceAll("B", "")
      .replaceAll("L", "")
      .replaceAll("A", "")
  );
}

function capitalizeFirstLetter(string) {
  if (!string) return ""; // Handle empty or null strings
  var splitStr = string.replaceAll("-", " ").split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
}

function createSheetJSON() {
  return JSON.stringify(
    {
      characterName: characterNameRef.value,
      playerName: playerNameRef.value,
      exaltType: exaltTypeRef.value,
      caste: casteRef.value,
      strength: strengthRef.value,
      dexterity: dexterityRef.value,
      stamina: staminaRef.value,
      charisma: charismaRef.value,
      manipulation: manipulationRef.value,
      appearance: appearanceRef.value,
      perception: perceptionRef.value,
      intelligence: intelligenceRef.value,
      wits: witsRef.value,
      abilityScore: toRaw(abilityScoreRefs.value),
      essence: essenceRef.value,
      health: toRaw(healthRef.value),
      specialty: toRaw(specialtyRefs.value),
      willpowerPerm: willpowerPermRef.value,
      willpowerTemp: willpowerTempRef.value,
      compassionPerm: compassionPermRef.value,
      compassionTemp: compassionTempRef.value,
      temperancePerm: temperancePermRef.value,
      temperanceTemp: temperanceTempRef.value,
      convictionPerm: convictionPermRef.value,
      convictionTemp: convictionTempRef.value,
      valorPerm: valorPermRef.value,
      valorTemp: valorPermRef.value,
      virtueFlaw: virtueFlawRef.value,
      limitBreakDuration: limitBreakDurationRef.value,
      limitBreakCondition: limitBreakConditionRef.value,
      partialControl: partialControlRef.value,
      noControl: noControlRef.value,
      primaryVirtue: primaryVirtueRef.value,
      limit: limitRef.value,
      weapon: {
        name: toRaw(weaponNameRefs.value),
        speed: toRaw(weaponSpeedRefs.value),
        acc: toRaw(weaponAccRefs.value),
        "acc-bonus": toRaw(weaponAccBonusRefs.value),
        damage: toRaw(weaponDamageRefs.value),
        "damage-bonus": toRaw(weaponDamageBonusRefs.value),
        pdv: toRaw(weaponPdvRefs.value),
        "pdv-bonus": toRaw(weaponPdvBonusRefs.value),
        rate: toRaw(weaponRateRefs.value),
        range: toRaw(weaponRangeRefs.value),
        tag: toRaw(weaponTagRefs.value),
        notes: toRaw(weaponNotesRefs.value),
        type: toRaw(weaponTypeRefs.value),
      },
      armor: {
        name: toRaw(armorNameRefs.value),
        type: toRaw(armorTypeRefs.value),
        soak: toRaw(armorSoakRefs.value),
        hardness: toRaw(armorHardnessRefs.value),
        fatigue: toRaw(armorFatigueRefs.value),
        mobility: toRaw(armorMobilityRefs.value),
        notes: toRaw(armorNotesRefs.value),
        equipped: toRaw(armorEquippedRefs.value),
      },
      language: toRaw(languageRefs.value),
      charm: toRaw(charmRefs.value),
      combo: toRaw(comboRefs.value),
      sorcery: toRaw(sorceryRefs.value),
      artifact: toRaw(artifactRefs.value),
      manse: toRaw(manseRefs.value),
      background: toRaw(backgroundRefs.value),
      possessions: possessionsRef.value,
      totalXp: totalXpRef.value,
      totalXpSpent: totalXpSpentRef.value,
      xpSpentOn: xpSpentOnRef.value,
      ageActual: ageActualRef.value,
      ageApparent: ageApparentRef.value,
      height: heightRef.value,
      weight: weightRef.value,
      gender: genderRef.value,
      eyeColor: eyeColorRef.value,
      hairColor: hairColorRef.value,
      homeland: homelandRef.value,
      skin: skinRef.value,
      playerImage: playerImageBase64.value,
      backstory: backstoryRef.value,
    },
    null,
    2
  );
}

async function saveSheetToLocal() {
  const json = createSheetJSON();

  const filename =
    characterNameRef.value !== ""
      ? characterNameRef.value.toLowerCase().replaceAll(" ", "-") + ".json"
      : exaltTypeRef.value.toLowerCase().replaceAll(" ", "-") + ".json";

  const blob = new Blob([json], { type: "application/json" });
  if ("showSaveFilePicker" in window) {
    // Chromium browsers
    const handle = await window.showSaveFilePicker({
      suggestedName: filename,
      types: [
        {
          description: "Exalted Sheet Data",
          accept: { "application/json": [".json"] },
        },
      ],
    });
    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
  } else {
    // Standards-only fallback
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}

function loadSheetFromLocal(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => loadSheet(reader.result);

  reader.readAsText(file);
}

const loadSheet = (data) => {
  try {
    // Deserialize JSON
    const loadedFile = JSON.parse(data);
    // console.log("Loaded document:", loadedFile);
    characterNameRef.value = loadedFile.characterName;
    playerNameRef.value = loadedFile.playerName;
    exaltTypeRef.value = loadedFile.exaltType;
    casteRef.value = loadedFile.caste;
    strengthRef.value = loadedFile.strength;
    dexterityRef.value = loadedFile.dexterity;
    staminaRef.value = loadedFile.stamina;
    charismaRef.value = loadedFile.charisma;
    manipulationRef.value = loadedFile.manipulation;
    appearanceRef.value = loadedFile.appearance;
    perceptionRef.value = loadedFile.perception;
    intelligenceRef.value = loadedFile.intelligence;
    witsRef.value = loadedFile.wits;
    abilityScoreRefs.value = loadedFile.abilityScore;
    essenceRef.value = loadedFile.essence;
    healthRef.value = loadedFile.health;
    specialtyRefs.value = loadedFile.specialty;
    willpowerPermRef.value = loadedFile.willpowerPerm;
    willpowerTempRef.value = loadedFile.willpowerTemp;
    compassionPermRef.value = loadedFile.compassionPerm;
    compassionTempRef.value = loadedFile.compassionTemp;
    temperancePermRef.value = loadedFile.temperancePerm;
    temperanceTempRef.value = loadedFile.temperanceTemp;
    convictionPermRef.value = loadedFile.convictionPerm;
    convictionTempRef.value = loadedFile.convictionTemp;
    valorPermRef.value = loadedFile.valorPerm;
    valorTempRef.value = loadedFile.valorTemp;
    virtueFlawRef.value = loadedFile.virtueFlaw;
    limitBreakDurationRef.value = loadedFile.limitBreakDuration;
    limitBreakConditionRef.value = loadedFile.limitBreakCondition;
    partialControlRef.value = loadedFile.partialControl;
    noControlRef.value = loadedFile.noControl;
    primaryVirtueRef.value = loadedFile.primaryVirtue;
    limitRef.value = loadedFile.limit;
    weaponNameRefs.value = loadedFile.weapon.name;
    weaponSpeedRefs.value = loadedFile.weapon.speed;
    weaponAccRefs.value = loadedFile.weapon.acc;
    weaponAccRefs.value = loadedFile.weapon["acc-bonus"];
    weaponDamageRefs.value = loadedFile.weapon.damage;
    weaponDamageRefs.value = loadedFile.weapon["damage-bonus"];
    weaponPdvRefs.value = loadedFile.weapon.pdv;
    weaponPdvRefs.value = loadedFile.weapon["pdv-bonus"];
    weaponRateRefs.value = loadedFile.weapon.rate;
    weaponRangeRefs.value = loadedFile.weapon.range;
    weaponTagRefs.value = loadedFile.weapon.tag;
    weaponNotesRefs.value = loadedFile.weapon.notes;
    weaponTypeRefs.value = loadedFile.weapon.type;
    armorNameRefs.value = loadedFile.armor.name;
    armorTypeRefs.value = loadedFile.armor.type;
    armorSoakRefs.value = loadedFile.armor.soak;
    armorHardnessRefs.value = loadedFile.armor.hardness;
    armorFatigueRefs.value = loadedFile.armor.fatigue;
    armorMobilityRefs.value = loadedFile.armor.mobility;
    armorNotesRefs.value = loadedFile.armor.notes;
    armorEquippedRefs.value = loadedFile.armor.equipped;
    languageRefs.value = loadedFile.language;
    charmRefs.value = loadedFile.charm;
    comboRefs.value = loadedFile.combo;
    sorceryRefs.value = loadedFile.sorcery;
    artifactRefs.value = loadedFile.artifact;
    manseRefs.value = loadedFile.manse;
    backgroundRefs.value = loadedFile.background;
    possessionsRef.value = loadedFile.possessions;
    totalXpRef.value = loadedFile.totalXp;
    totalXpSpentRef.value = loadedFile.totalXpSpent;
    xpSpentOnRef.value = loadedFile.xpSpentOn;
    ageActualRef.value = loadedFile.ageActual;
    ageApparentRef.value = loadedFile.ageApparent;
    heightRef.value = loadedFile.height;
    weightRef.value = loadedFile.weight;
    genderRef.value = loadedFile.gender;
    eyeColorRef.value = loadedFile.eyeColor;
    hairColorRef.value = loadedFile.hairColor;
    homelandRef.value = loadedFile.homeland;
    skinRef.value = loadedFile.skin;
    playerImageBase64.value = loadedFile.playerImage;
    backstoryRef.value = loadedFile.backstory;
  } catch (err) {
    console.error("Invalid JSON file:", err);
    alert("Error: The file is not valid .json file.");
  }
};

//Called when user clicks on drive icon
const loadSheetFromDrive = () => {
  google.accounts.oauth2
    .initTokenClient({
      client_id: clientId,
      scope: scope,
      callback: handleAuthResult,
    })
    .requestAccessToken();
};

//handles the result from the google Auth attempt. Creates picker if success
const handleAuthResult = (authResult) => {
  if (authResult && !authResult.error) {
    oauthToken.value = authResult.access_token;
    gapi.load("picker", () => {
      pickerApiLoaded.value = true;
      createPicker();
    });
  }
};

//Creates the picker
const createPicker = () => {
  if (pickerApiLoaded.value && oauthToken.value) {
    var myView = new google.picker.DocsView(google.picker.ViewId.DOCS);
    myView.setMode(google.picker.DocsViewMode.LIST);
    myView.setMimeTypes("application/json");
    myView.setIncludeFolders(false);

    var picker = new google.picker.PickerBuilder()
      .addView(myView)
      .setOAuthToken(oauthToken.value)
      .setDeveloperKey(developerKey)
      .setCallback(pickerCallback)
      .build();
    picker.setVisible(true);
  }
};

//callback from the picker
const pickerCallback = async (data) => {
  if (data[google.picker.Response.ACTION] === google.picker.Action.PICKED) {
    //get only first document of array of selected docs
    var doc = data[google.picker.Response.DOCUMENTS][0];
    if (doc) {
      fileId.value = doc.id;
      //generate the download URL for this doc
      //the alt=media is important for ensuring the content of the file is placed in response body
      var downloadUrl =
        "https://www.googleapis.com/drive/v2/files/" +
        doc.id +
        "v" +
        developerKey +
        " HTTP/1.1&alt=media";
      downloadFile(downloadUrl, (content) => loadSheet(content));
    }
  }
};

//performs GET for the content of the file
const downloadFile = async (downloadUrl, callback) => {
  if (downloadUrl && oauthToken.value) {
    var accessToken = oauthToken.value;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", downloadUrl);
    xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
    xhr.onload = function () {
      callback(xhr.responseText);
    };
    xhr.onerror = function () {
      callback(null);
    };
    xhr.send();
  } else {
    callback(null);
  }
};

const saveSheetToDrive = async () => {
  fileId == null ? uploadDriveFile() : updateDriveFile();
};

const uploadDriveFile = async () => {
  const response = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=media",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${oauthToken.value}`,
        "Content-Type": "application/json",
      },
      body: createSheetJSON(),
    }
  );

  if (!response.ok) {
    throw new Error("Drive save failed");
  }
};

const updateDriveFile = async () => {
  const response = await fetch(
    `https://www.googleapis.com/upload/drive/v3/files/${fileId.value}?uploadType=media`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${oauthToken.value}`,
        "Content-Type": "application/json",
      },
      body: createSheetJSON(),
    }
  );

  if (!response.ok) {
    throw new Error("Drive save failed");
  }
};
</script>

<style>
.side-buttons-container {
  position: fixed;
  display: flex;
  top: 0;
  right: 0.1in;
  height: 100vh;
}

.side-buttons {
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.1in;
  border-radius: 0.1in;
  margin-block: auto;
  gap: 0.05in;
}

.side-buttons > button,
.side-buttons > label {
  border-radius: 0.1in;
  border: none;
  background: transparent;
  aspect-ratio: 1 / 1;
  padding: 4px;
}

.side-buttons > button:hover,
.side-buttons > label:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Required for printing backgrounds */
* {
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}

.page {
  width: 8.5in;
  height: 11in;
  padding: 0.5in;
  padding-top: 0.4in;
  background-color: white;
  margin: 1rem auto;
  box-sizing: border-box;
}
.text-input {
  border: none;
  border-bottom: 1px solid #000000;
}
.full-bar-with-text {
  position: relative;
  text-align: center;
}

.full-bar-with-text > div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 0.1in;
}

.attribute-dots {
  float: right;
  margin-right: 0.1in;
}

.modal-mask {
  position: fixed;
  z-index: 9997;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

@media print {
  #health-level-time-table td {
    border: 1pt solid black !important;
  }

  #selectImageButton {
    display: none;
  }

  .side-buttons-container {
    display: none;
  }

  .page {
    page-break-after: always;
    margin: none;
  }

  #final-page {
    page-break-after: avoid;
  }
}
</style>
