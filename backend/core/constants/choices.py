from .prompt import (
    SIMPLIFIED_PROMPT,
    OVERSIMPLIFIED_PROMPT,
    SUMMARY_PROMPT,
    KEYPOINTS_PROMPT,
)

LANGUAGE_CHOICES = [
    ("en", "English"),
    ("hi", "Hindi"),
    ("ta", "Tamil"),
    ("mr", "Marathi"),
    ("gu", "Gujarati"),
    ("bn", "Bengali"),
    ("or", "Odia"),
    ("ml", "Malayalam"),
    ("kn", "Kannada"),
    ("pa", "Punjabi"),
    ("te", "Telugu"),
    # Add more
]


TEXT_TYPE_CHOICES = [
    {"choice": ("original", "Original"), "prompt": ""},
    {"choice": ("simplified", "Simplified"), "prompt": SIMPLIFIED_PROMPT},
    {"choice": ("oversimplified", "Over Simplified"), "prompt": OVERSIMPLIFIED_PROMPT},
    {"choice": ("summary", "Summary"), "prompt": SUMMARY_PROMPT},
    {"choice": ("keypoints", "Key Points"), "prompt": KEYPOINTS_PROMPT},
]


MINISTRY_MAP_CONSOLIDATED = {
    "President's Secretariat": {
        "audience": [
            "Media",
            "Policymakers",
            "Researchers",
            "International",
        ],
        "category": [
            "Administration",
        ],
    },
    "Vice President's Secretariat": {
        "audience": [
            "Media",
            "Policymakers",
        ],
        "category": ["Administration"],
    },
    "Prime Minister's Office": {
        "audience": [
            "Media",
            "Policymakers",
            "Business",
            "International",
            "Researchers",
        ],
        "category": [
            "Administration",
            "Economy",
            "Foreign Affairs",
            "Defence",
        ],
    },
    "Lok Sabha Secretariat": {
        "audience": [
            "Policymakers",
            "Media",
            "Researchers",
            "Legal",
        ],
        "category": ["Administration", "Justice"],
    },
    "Cabinet": {
        "audience": [
            "Policymakers",
            "Media",
            "Business",
        ],
        "category": ["Administration"],
    },
    "Cabinet Committee Decisions": {
        "audience": [
            "Policymakers",
            "Media",
            "Business",
            "Researchers",
        ],
        "category": [
            "Administration",
            "Economy",
            "Infrastructure",
        ],
    },
    "Cabinet Committee on Economic Affairs (CCEA)": {
        "audience": [
            "Policymakers",
            "Business",
            "Media",
            "Researchers",
        ],
        "category": ["Economy", "Administration"],
    },
    "Cabinet Secretariat": {
        "audience": ["Policymakers", "Media"],
        "category": ["Administration"],
    },
    "Cabinet Committee on Infrastructure": {
        "audience": [
            "Policymakers",
            "Business",
            "Media",
        ],
        "category": ["Infrastructure", "Economy"],
    },
    "Cabinet Committee on Price": {
        "audience": [
            "Policymakers",
            "Business",
            "Media",
            "Consumers",
        ],
        "category": ["Economy", "Consumer Affairs"],
    },
    "Cabinet Committee on Investment": {
        "audience": [
            "Policymakers",
            "Business",
            "Media",
        ],
        "category": ["Economy"],
    },
    "AYUSH": {
        "audience": [
            "Practitioners",
            "Researchers",
            "Business",
        ],
        "category": ["Health", "Culture"],
    },
    "Other Cabinet Committees": {
        "audience": [
            "Policymakers",
            "Media",
            "Researchers",
        ],
        "category": ["Administration"],
    },
    "Department of Space": {
        "audience": [
            "Researchers",
            "Practitioners",
            "Policymakers",
            "Media",
            "Business",
        ],
        "category": [
            "Technology",
            "Defence",
        ],
    },
    "Department of Ocean Development": {
        "audience": [
            "Researchers",
            "Policymakers",
            "Business",
            "Stakeholders",
        ],
        "category": [
            "Technology",
            "Environment",
            "Energy",
        ],
    },
    "Department of Atomic Energy": {
        "audience": [
            "Researchers",
            "Practitioners",
            "Policymakers",
            "Business",
        ],
        "category": [
            "Energy",
            "Technology",
            "Defence",
        ],
    },
    "Election Commission": {
        "audience": [
            "Policymakers",
            "Media",
            "NGOs",
        ],
        "category": ["Administration"],
    },
    "Finance Commission": {
        "audience": [
            "Policymakers",
            "Researchers",
            "Media",
        ],
        "category": ["Economy", "Administration"],
    },
    "Ministry of Agriculture & Farmers Welfare": {
        "audience": [
            "Farmers",
            "Business",
            "Policymakers",
        ],
        "category": ["Agriculture", "Economy"],
    },
    "Ministry of Agro & Rural Industries": {
        "audience": [
            "Farmers",
            "Business",
            "Policymakers",
        ],
        "category": ["Agriculture", "Economy"],
    },
    "Ministry of Chemicals and Fertilizers": {
        "audience": [
            "Business",
            "Farmers",
            "Policymakers",
        ],
        "category": [
            "Economy",
            "Agriculture",
            "Health",
        ],
    },
    "Ministry of Civil Aviation": {
        "audience": [
            "Business",
            "Travelers",
            "Policymakers",
        ],
        "category": ["Infrastructure", "Economy"],
    },
    "Ministry of Coal": {
        "audience": [
            "Business",
            "Policymakers",
            "Workers",
        ],
        "category": ["Energy", "Economy"],
    },
    "Ministry of Commerce & Industry": {
        "audience": [
            "Business",
            "Policymakers",
            "Media",
            "International",
        ],
        "category": [
            "Economy",
            "Foreign Affairs",
        ],
    },
    "Ministry of Communications": {
        "audience": [
            "Business",
            "Policymakers",
            "Users",
        ],
        "category": [
            "Technology",
            "Infrastructure",
        ],
    },
    "Ministry of Company Affairs": {
        "audience": [
            "Business",
            "Legal",
            "Professionals",
            "Policymakers",
        ],
        "category": ["Corporate Affairs", "Economy"],
    },
    "Ministry of Consumer Affairs, Food & Public Distribution": {
        "audience": [
            "Consumers",
            "Business",
            "Policymakers",
        ],
        "category": [
            "Consumer Affairs",
            "Agriculture",
            "Economy",
        ],
    },
    "Ministry of Cooperation": {
        "audience": [
            "Cooperatives",
            "Business",
            "Policymakers",
        ],
        "category": [
            "Agriculture",
            "Economy",
            "Welfare",
        ],
    },
    "Ministry of Corporate Affairs": {
        "audience": [
            "Business",
            "Legal",
            "Professionals",
            "Policymakers",
            "Researchers",
        ],
        "category": [
            "Corporate Affairs",
            "Economy",
            "Justice",
        ],
    },
    "Ministry of Culture": {
        "audience": [
            "Researchers",
            "Artists",
            "Media",
            "International",
        ],
        "category": ["Culture", "Education"],
    },
    "Ministry of Defence": {
        "audience": [
            "Policymakers",
            "Military",
            "Media",
            "Business",
            "International",
        ],
        "category": [
            "Defence",
            "Technology",
        ],
    },
    "Ministry of Development of North-East Region": {
        "audience": [
            "Business",
            "Policymakers",
            "NGOs",
            "Communities",
        ],
        "category": [
            "Infrastructure",
            "Economy",
            "Welfare",
            "Culture",
        ],
    },
    "Ministry of Disinvestment": {
        "audience": [
            "Business",
            "Policymakers",
            "Media",
            "Researchers",
        ],
        "category": ["Economy"],
    },
    "Ministry of Drinking Water & Sanitation": {
        "audience": [
            "Policymakers",
            "NGOs",
            "Communities",
        ],
        "category": [
            "Health",
            "Infrastructure",
            "Environment",
        ],
    },
    "Ministry of Earth Sciences": {
        "audience": [
            "Researchers",
            "Policymakers",
            "Media",
            "Scientists",
            "Business",
        ],
        "category": [
            "Technology",
            "Environment",
            "Energy",
            "Agriculture",
        ],
    },
    "Ministry of Education": {
        "audience": [
            "Students",
            "Teachers",
            "Researchers",
            "Policymakers",
        ],
        "category": [
            "Education",
            "Technology",
        ],
    },
    "Ministry of Electronics & IT": {
        "audience": [
            "Business",
            "Professionals",
            "Researchers",
            "Policymakers",
        ],
        "category": [
            "Technology",
            "Economy",
            "Administration",
        ],
    },
    "Ministry of Environment, Forest and Climate Change": {
        "audience": [
            "Business",
            "NGOs",
            "Researchers",
            "Policymakers",
            "Environmentalists",
        ],
        "category": [
            "Environment",
            "Technology",
        ],
    },
    "Ministry of External Affairs": {
        "audience": [
            "International",
            "Policymakers",
            "Media",
            "Business",
            "Researchers",
        ],
        "category": [
            "Foreign Affairs",
            "Economy",
        ],
    },
    "Ministry of Finance": {
        "audience": [
            "Business",
            "Policymakers",
            "Media",
            "Researchers",
            "International",
        ],
        "category": [
            "Economy",
            "Administration",
            "Corporate Affairs",
        ],
    },
    "Ministry of Fisheries, Animal Husbandry & Dairying": {
        "audience": [
            "Farmers",
            "Business",
            "Researchers",
        ],
        "category": [
            "Agriculture",
            "Economy",
            "Health",
        ],
    },
    "Ministry of Food Processing Industries": {
        "audience": [
            "Business",
            "Farmers",
            "Researchers",
        ],
        "category": ["Economy", "Agriculture"],
    },
    "Ministry of Health and Family Welfare": {
        "audience": [
            "Healthcare Workers",
            "Patients",
            "Researchers",
            "Business",
            "Policymakers",
        ],
        "category": [
            "Health",
            "Welfare",
            "Technology",
        ],
    },
    "Ministry of Heavy Industries": {
        "audience": [
            "Business",
            "Policymakers",
            "Workers",
        ],
        "category": ["Economy", "Infrastructure"],
    },
    "Ministry of Home Affairs": {
        "audience": [
            "Policymakers",
            "Media",
            "NGOs",
            "Security Forces",
        ],
        "category": [
            "Defence",
            "Administration",
            "Justice",
        ],
    },
    "Ministry of Housing & Urban Affairs": {
        "audience": [
            "Business",
            "Policymakers",
            "NGOs",
            "Urban Residents",
        ],
        "category": [
            "Infrastructure",
            "Environment",
            "Welfare",
        ],
    },
    "Ministry of Information & Broadcasting": {
        "audience": [
            "Media",
            "Business",
            "Policymakers",
            "Researchers",
        ],
        "category": [
            "Technology",
            "Culture",
            "Administration",
        ],
    },
    "Ministry of Jal Shakti": {
        "audience": [
            "Farmers",
            "Business",
            "Policymakers",
            "NGOs",
            "Researchers",
        ],
        "category": [
            "Environment",
            "Infrastructure",
            "Agriculture",
            "Health",
        ],
    },
    "Ministry of Labour & Employment": {
        "audience": [
            "Workers",
            "Business",
            "Policymakers",
            "NGOs",
        ],
        "category": [
            "Welfare",
            "Economy",
            "Education",
        ],
    },
    "Ministry of Law and Justice": {
        "audience": [
            "Legal",
            "Policymakers",
            "Media",
            "Researchers",
        ],
        "category": ["Justice", "Administration"],
    },
    "Ministry of Micro,Small & Medium Enterprises": {
        "audience": [
            "Business",
            "Entrepreneurs",
            "Policymakers",
        ],
        "category": ["Economy", "Education"],
    },
    "Ministry of Mines": {
        "audience": [
            "Business",
            "Policymakers",
            "Miners",
            "Researchers",
        ],
        "category": [
            "Energy",
            "Economy",
            "Environment",
        ],
    },
    "Ministry of Minority Affairs": {
        "audience": [
            "Minorities",
            "NGOs",
            "Policymakers",
        ],
        "category": [
            "Welfare",
            "Education",
            "Culture",
        ],
    },
    "Ministry of New and Renewable Energy": {
        "audience": [
            "Business",
            "Researchers",
            "Policymakers",
            "International",
        ],
        "category": [
            "Energy",
            "Environment",
            "Technology",
        ],
    },
    "Ministry of Overseas Indian Affairs": {
        "audience": [
            "International",
            "Diaspora",
        ],
        "category": [
            "Foreign Affairs",
            "Welfare",
        ],
    },
    "Ministry of Panchayati Raj": {
        "audience": [
            "Policymakers",
            "Rural Communities",
            "NGOs",
        ],
        "category": [
            "Administration",
            "Agriculture",
            "Welfare",
        ],
    },
    "Ministry of Parliamentary Affairs": {
        "audience": ["Policymakers", "Media"],
        "category": ["Administration", "Justice"],
    },
    "Ministry of Personnel, Public Grievances & Pensions": {
        "audience": [
            "Policymakers",
            "Employees",
            "Pensioners",
        ],
        "category": [
            "Administration",
            "Welfare",
            "Justice",
        ],
    },
    "Ministry of Petroleum & Natural Gas": {
        "audience": [
            "Business",
            "Policymakers",
            "International",
        ],
        "category": ["Energy", "Economy"],
    },
    "Ministry of Planning": {
        "audience": [
            "Policymakers",
            "Researchers",
            "Business",
        ],
        "category": ["Administration", "Economy"],
    },
    "Ministry of Power": {
        "audience": [
            "Business",
            "Policymakers",
            "Utilities",
        ],
        "category": [
            "Energy",
            "Economy",
            "Infrastructure",
        ],
    },
    "Ministry of Railways": {
        "audience": [
            "Business",
            "Passengers",
            "Policymakers",
        ],
        "category": ["Infrastructure", "Economy"],
    },
    "Ministry of Road Transport & Highways": {
        "audience": [
            "Business",
            "Drivers",
            "Policymakers",
        ],
        "category": ["Infrastructure", "Economy"],
    },
    "Ministry of Rural Development": {
        "audience": [
            "Rural Communities",
            "Policymakers",
            "NGOs",
        ],
        "category": [
            "Agriculture",
            "Welfare",
            "Infrastructure",
        ],
    },
    "Ministry of Science & Technology": {
        "audience": [
            "Researchers",
            "Business",
            "Scientists",
            "Policymakers",
            "Students",
        ],
        "category": [
            "Technology",
            "Education",
            "Economy",
        ],
    },
    "Ministry of Ports, Shipping and Waterways": {
        "audience": [
            "Business",
            "Policymakers",
            "International",
            "Traders",
        ],
        "category": [
            "Infrastructure",
            "Economy",
            "Foreign Affairs",
        ],
    },
    "Ministry of Skill Development and Entrepreneurship": {
        "audience": [
            "Youth",
            "Business",
            "Researchers",
            "Trainers",
        ],
        "category": [
            "Education",
            "Economy",
            "Welfare",
        ],
    },
    "Ministry of Social Justice & Empowerment": {
        "audience": [
            "Marginalized Groups",
            "NGOs",
            "Policymakers",
            "Legal",
        ],
        "category": [
            "Welfare",
            "Education",
            "Health",
            "Justice",
        ],
    },
    "Ministry of Statistics & Programme Implementation": {
        "audience": [
            "Policymakers",
            "Researchers",
            "Business",
            "Media",
        ],
        "category": ["Administration", "Economy"],
    },
    "Ministry of Steel": {
        "audience": [
            "Business",
            "Policymakers",
            "Workers",
        ],
        "category": [
            "Economy",
            "Infrastructure",
            "Energy",
        ],
    },
    "Ministry of Surface Transport": {
        "audience": [
            "Business",
            "Drivers",
        ],
        "category": ["Infrastructure"],
    },
    "Ministry of Textiles": {
        "audience": [
            "Business",
            "Artisans",
            "Researchers",
        ],
        "category": [
            "Economy",
            "Culture",
            "Agriculture",
        ],
    },
    "Ministry of Tourism": {
        "audience": [
            "Business",
            "International",
            "Media",
            "Tourists",
        ],
        "category": [
            "Culture",
            "Economy",
            "Infrastructure",
        ],
    },
    "Ministry of Tribal Affairs": {
        "audience": [
            "Tribal Communities",
            "NGOs",
            "Researchers",
            "Policymakers",
        ],
        "category": [
            "Welfare",
            "Culture",
            "Environment",
            "Education",
        ],
    },
    "Ministry of Urban Development": {
        "audience": [
            "Business",
            "Policymakers",
        ],
        "category": ["Infrastructure"],
    },
    "Ministry of Water Resources, River Development and Ganga Rejuvenation": {
        "audience": [
            "Farmers",
            "Business",
            "Policymakers",
            "NGOs",
        ],
        "category": [
            "Environment",
            "Agriculture",
            "Infrastructure",
        ],
    },
    "Ministry of Women and Child Development": {
        "audience": [
            "Women",
            "NGOs",
            "Healthcare Workers",
            "Policymakers",
        ],
        "category": [
            "Welfare",
            "Health",
            "Education",
        ],
    },
    "Ministry of Youth Affairs and Sports": {
        "audience": [
            "Youth",
            "Researchers",
            "Athletes",
        ],
        "category": [
            "Education",
            "Culture",
            "Health",
        ],
    },
    "NITI Aayog": {
        "audience": [
            "Policymakers",
            "Researchers",
            "Business",
            "NGOs",
            "Media",
        ],
        "category": [
            "Administration",
            "Economy",
            "Welfare",
            "Technology",
            "Infrastructure",
        ],
    },
    "PM Speech": {
        "audience": [
            "Media",
            "Policymakers",
            "International",
        ],
        "category": ["Administration"],
    },
    "EAC-PM": {
        "audience": [
            "Policymakers",
            "Researchers",
            "Media",
        ],
        "category": ["Economy", "Administration"],
    },
    "UPSC": {
        "audience": [
            "Aspirants",
            "Researchers",
            "Policymakers",
        ],
        "category": ["Administration", "Education"],
    },
    "Special Service and Features": {
        "audience": ["Media", "Researchers"],
        "category": ["Administration"],
    },
    "PIB Headquarters": {
        "audience": [
            "Media",
            "Policymakers",
            "Researchers",
        ],
        "category": ["Administration"],
    },
    "Office of Principal Scientific Advisor to GoI": {
        "audience": [
            "Policymakers",
            "Researchers",
            "Business",
            "Scientists",
        ],
        "category": [
            "Technology",
            "Administration",
        ],
    },
    "National Financial Reporting Authority": {
        "audience": [
            "Business",
            "Professionals",
            "Legal",
            "Policymakers",
        ],
        "category": [
            "Corporate Affairs",
            "Economy",
            "Justice",
        ],
    },
    "Competition Commission of India": {
        "audience": [
            "Business",
            "Legal",
            "Consumers",
            "Policymakers",
        ],
        "category": [
            "Corporate Affairs",
            "Economy",
            "Consumer Affairs",
            "Justice",
        ],
    },
    "IFSC Authority": {
        "audience": [
            "Business",
            "International",
            "Policymakers",
            "Financial Services",
        ],
        "category": [
            "Economy",
            "Foreign Affairs",
            "Corporate Affairs",
        ],
    },
    "National Security Council Secretariat": {
        "audience": [
            "Policymakers",
            "Researchers",
            "International",
        ],
        "category": [
            "Defence",
            "Foreign Affairs",
            "Administration",
        ],
    },
    "National Human Rights Commission": {
        "audience": [
            "Legal",
            "NGOs",
            "Policymakers",
            "Rights Groups",
        ],
        "category": [
            "Welfare",
            "Justice",
            "Administration",
        ],
    },
    "Lokpal of India": {
        "audience": [
            "Policymakers",
            "Legal",
            "NGOs",
            "Media",
        ],
        "category": [
            "Administration",
            "Justice",
            "Welfare",
        ],
    },
}

if __name__ == "__main__":
    # To verify the unique counts:
    all_audiences = set()
    all_categories = set()
    for ministry_data in MINISTRY_MAP_CONSOLIDATED.values():
        for aud in ministry_data["audience"]:
            all_audiences.add(aud)
        for cat in ministry_data["category"]:
            all_categories.add(cat)

    print(f"Unique Audiences ({len(all_audiences)}): {sorted(list(all_audiences))}")
    print(f"Unique Categories ({len(all_categories)}): {sorted(list(all_categories))}")
