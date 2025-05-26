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
            "General Public",
            "Media & Journalists",
            "Government & Policymakers",
            "Academia & Researchers",
            "International Community",
        ],
        "category": [
            "Governance & Public Administration",
            "Culture, Heritage & Tourism",
        ],  # Ceremonial aspects
    },
    "Vice President's Secretariat": {
        "audience": [
            "General Public",
            "Media & Journalists",
            "Government & Policymakers",
        ],
        "category": ["Governance & Public Administration"],
    },
    "Prime Minister's Office": {
        "audience": [
            "General Public",
            "Media & Journalists",
            "Government & Policymakers",
            "Businesses & Industry",
            "International Community",
            "Academia & Researchers",
        ],
        "category": [
            "Governance & Public Administration",
            "Economy & Finance",
            "Foreign Affairs & International Cooperation",
            "Defence & National Security",
        ],
    },
    "Lok Sabha Secretariat": {
        "audience": [
            "Government & Policymakers",
            "Media & Journalists",
            "General Public",
            "Academia & Researchers",
            "Legal & Judiciary",
        ],
        "category": ["Governance & Public Administration", "Law & Justice"],
    },
    "Cabinet": {
        "audience": [
            "Government & Policymakers",
            "Media & Journalists",
            "General Public",
            "Businesses & Industry",
        ],
        "category": ["Governance & Public Administration"],
    },
    "Cabinet Committee Decisions": {  # General, so broad categories
        "audience": [
            "Government & Policymakers",
            "Media & Journalists",
            "Businesses & Industry",
            "Academia & Researchers",
        ],
        "category": [
            "Governance & Public Administration",
            "Economy & Finance",
            "Infrastructure & Urban Development",
        ],
    },
    "Cabinet Committee on Economic Affairs (CCEA)": {
        "audience": [
            "Government & Policymakers",
            "Businesses & Industry",
            "Media & Journalists",
            "Academia & Researchers",
        ],
        "category": ["Economy & Finance", "Governance & Public Administration"],
    },
    "Cabinet Secretariat": {
        "audience": ["Government & Policymakers", "Media & Journalists"],
        "category": ["Governance & Public Administration"],
    },
    "Cabinet Committee on Infrastructure": {
        "audience": [
            "Government & Policymakers",
            "Businesses & Industry",
            "Media & Journalists",
        ],
        "category": ["Infrastructure & Urban Development", "Economy & Finance"],
    },
    "Cabinet Committee on Price": {
        "audience": [
            "Government & Policymakers",
            "Businesses & Industry",
            "Media & Journalists",
            "General Public",
            "Sector-Specific Stakeholders",
        ],  # Consumers
        "category": ["Economy & Finance", "Consumer Affairs & Public Distribution"],
    },
    "Cabinet Committee on Investment": {
        "audience": [
            "Government & Policymakers",
            "Businesses & Industry",
            "Media & Journalists",
        ],
        "category": ["Economy & Finance"],
    },
    "AYUSH": {
        "audience": [
            "General Public",
            "Sector-Specific Stakeholders",
            "Service Professionals & Practitioners",
            "Academia & Researchers",
            "Businesses & Industry",
        ],
        "category": ["Health & Wellness", "Culture, Heritage & Tourism"],
    },
    "Other Cabinet Committees": {
        "audience": [
            "Government & Policymakers",
            "Media & Journalists",
            "Academia & Researchers",
        ],
        "category": ["Governance & Public Administration"],  # Generic
    },
    "Department of Space": {
        "audience": [
            "Academia & Researchers",
            "Service Professionals & Practitioners",
            "Government & Policymakers",
            "Media & Journalists",
            "Businesses & Industry",
        ],
        "category": [
            "Science, Technology & Communications",
            "Defence & National Security",
        ],
    },
    "Department of Ocean Development": {  # Often with Earth Sciences
        "audience": [
            "Academia & Researchers",
            "Government & Policymakers",
            "Businesses & Industry",
            "Sector-Specific Stakeholders",
        ],
        "category": [
            "Science, Technology & Communications",
            "Environment, Climate & Forests",
            "Energy & Natural Resources",
        ],
    },
    "Department of Atomic Energy": {
        "audience": [
            "Academia & Researchers",
            "Service Professionals & Practitioners",
            "Government & Policymakers",
            "Businesses & Industry",
        ],
        "category": [
            "Energy & Natural Resources",
            "Science, Technology & Communications",
            "Defence & National Security",
        ],
    },
    "Election Commission": {
        "audience": [
            "General Public",
            "Government & Policymakers",
            "Media & Journalists",
            "Civil Society & NGOs",
        ],
        "category": ["Governance & Public Administration"],
    },
    "Finance Commission": {
        "audience": [
            "Government & Policymakers",
            "Academia & Researchers",
            "Media & Journalists",
        ],
        "category": ["Economy & Finance", "Governance & Public Administration"],
    },
    "Ministry of Agriculture & Farmers Welfare": {
        "audience": [
            "Sector-Specific Stakeholders",
            "Businesses & Industry",
            "General Public",
            "Government & Policymakers",
            "Academia & Researchers",
        ],
        "category": ["Agriculture & Rural Development", "Economy & Finance"],
    },
    "Ministry of Agro & Rural Industries": {
        "audience": [
            "Sector-Specific Stakeholders",
            "Businesses & Industry",
            "General Public",
            "Government & Policymakers",
        ],
        "category": ["Agriculture & Rural Development", "Economy & Finance"],
    },
    "Ministry of Chemicals and Fertilizers": {
        "audience": [
            "Businesses & Industry",
            "Sector-Specific Stakeholders",
            "Government & Policymakers",
        ],
        "category": [
            "Economy & Finance",
            "Agriculture & Rural Development",
            "Health & Wellness",
        ],  # Pharma
    },
    "Ministry of Civil Aviation": {
        "audience": [
            "Businesses & Industry",
            "General Public",
            "Sector-Specific Stakeholders",
            "Government & Policymakers",
        ],
        "category": ["Infrastructure & Urban Development", "Economy & Finance"],
    },
    "Ministry of Coal": {
        "audience": [
            "Businesses & Industry",
            "Government & Policymakers",
            "Sector-Specific Stakeholders",
        ],  # Workers
        "category": ["Energy & Natural Resources", "Economy & Finance"],
    },
    "Ministry of Commerce & Industry": {
        "audience": [
            "Businesses & Industry",
            "Government & Policymakers",
            "Media & Journalists",
            "International Community",
        ],
        "category": [
            "Economy & Finance",
            "Foreign Affairs & International Cooperation",
        ],
    },
    "Ministry of Communications": {
        "audience": [
            "General Public",
            "Businesses & Industry",
            "Government & Policymakers",
            "Sector-Specific Stakeholders",
        ],
        "category": [
            "Science, Technology & Communications",
            "Infrastructure & Urban Development",
        ],
    },
    "Ministry of Company Affairs": {  # (now Corporate Affairs)
        "audience": [
            "Businesses & Industry",
            "Legal & Judiciary",
            "Service Professionals & Practitioners",
            "Government & Policymakers",
        ],
        "category": ["Corporate Governance & Regulation", "Economy & Finance"],
    },
    "Ministry of Consumer Affairs, Food & Public Distribution": {
        "audience": [
            "General Public",
            "Sector-Specific Stakeholders",
            "Businesses & Industry",
            "Government & Policymakers",
        ],
        "category": [
            "Consumer Affairs & Public Distribution",
            "Agriculture & Rural Development",
            "Economy & Finance",
        ],
    },
    "Ministry of Cooperation": {
        "audience": [
            "Sector-Specific Stakeholders",
            "Businesses & Industry",
            "General Public",
            "Government & Policymakers",
        ],
        "category": [
            "Agriculture & Rural Development",
            "Economy & Finance",
            "Social Justice & Welfare",
        ],
    },
    "Ministry of Corporate Affairs": {
        "audience": [
            "Businesses & Industry",
            "Legal & Judiciary",
            "Service Professionals & Practitioners",
            "Government & Policymakers",
            "Academia & Researchers",
        ],
        "category": [
            "Corporate Governance & Regulation",
            "Economy & Finance",
            "Law & Justice",
        ],
    },
    "Ministry of Culture": {
        "audience": [
            "General Public",
            "Academia & Researchers",
            "Service Professionals & Practitioners",
            "Media & Journalists",
            "International Community",
        ],
        "category": ["Culture, Heritage & Tourism", "Education, Skills & Youth"],
    },
    "Ministry of Defence": {
        "audience": [
            "Government & Policymakers",
            "Service Professionals & Practitioners",
            "General Public",
            "Media & Journalists",
            "Businesses & Industry",
            "International Community",
        ],
        "category": [
            "Defence & National Security",
            "Science, Technology & Communications",
        ],
    },
    "Ministry of Development of North-East Region": {
        "audience": [
            "General Public",
            "Businesses & Industry",
            "Government & Policymakers",
            "Civil Society & NGOs",
            "Sector-Specific Stakeholders",
        ],
        "category": [
            "Infrastructure & Urban Development",
            "Economy & Finance",
            "Social Justice & Welfare",
            "Culture, Heritage & Tourism",
        ],
    },
    "Ministry of Disinvestment": {  # (now DIPAM under Finance)
        "audience": [
            "Businesses & Industry",
            "Government & Policymakers",
            "Media & Journalists",
            "Academia & Researchers",
        ],
        "category": ["Economy & Finance"],
    },
    "Ministry of Drinking Water & Sanitation": {  # (now under Jal Shakti)
        "audience": [
            "General Public",
            "Government & Policymakers",
            "Civil Society & NGOs",
            "Sector-Specific Stakeholders",
        ],
        "category": [
            "Health & Wellness",
            "Infrastructure & Urban Development",
            "Environment, Climate & Forests",
        ],
    },
    "Ministry of Earth Sciences": {
        "audience": [
            "Academia & Researchers",
            "Government & Policymakers",
            "Media & Journalists",
            "Sector-Specific Stakeholders",
            "Businesses & Industry",
        ],
        "category": [
            "Science, Technology & Communications",
            "Environment, Climate & Forests",
            "Energy & Natural Resources",
            "Agriculture & Rural Development",
        ],
    },
    "Ministry of Education": {
        "audience": [
            "Sector-Specific Stakeholders",
            "Service Professionals & Practitioners",
            "Academia & Researchers",
            "General Public",
            "Government & Policymakers",
        ],
        "category": [
            "Education, Skills & Youth",
            "Science, Technology & Communications",
        ],
    },
    "Ministry of Electronics & IT": {
        "audience": [
            "Businesses & Industry",
            "General Public",
            "Service Professionals & Practitioners",
            "Academia & Researchers",
            "Government & Policymakers",
        ],
        "category": [
            "Science, Technology & Communications",
            "Economy & Finance",
            "Governance & Public Administration",
        ],
    },
    "Ministry of Environment, Forest and Climate Change": {
        "audience": [
            "General Public",
            "Businesses & Industry",
            "Civil Society & NGOs",
            "Academia & Researchers",
            "Government & Policymakers",
            "Sector-Specific Stakeholders",
        ],
        "category": [
            "Environment, Climate & Forests",
            "Science, Technology & Communications",
        ],
    },
    "Ministry of External Affairs": {
        "audience": [
            "International Community",
            "Government & Policymakers",
            "Media & Journalists",
            "General Public",
            "Businesses & Industry",
            "Academia & Researchers",
        ],
        "category": [
            "Foreign Affairs & International Cooperation",
            "Economy & Finance",
        ],
    },
    "Ministry of Finance": {
        "audience": [
            "Businesses & Industry",
            "General Public",
            "Government & Policymakers",
            "Media & Journalists",
            "Academia & Researchers",
            "International Community",
        ],
        "category": [
            "Economy & Finance",
            "Governance & Public Administration",
            "Corporate Governance & Regulation",
        ],
    },
    "Ministry of Fisheries, Animal Husbandry & Dairying": {
        "audience": [
            "Sector-Specific Stakeholders",
            "Businesses & Industry",
            "General Public",
            "Academia & Researchers",
        ],
        "category": [
            "Agriculture & Rural Development",
            "Economy & Finance",
            "Health & Wellness",
        ],
    },
    "Ministry of Food Processing Industries": {
        "audience": [
            "Businesses & Industry",
            "Sector-Specific Stakeholders",
            "General Public",
            "Academia & Researchers",
        ],
        "category": ["Economy & Finance", "Agriculture & Rural Development"],
    },
    "Ministry of Health and Family Welfare": {
        "audience": [
            "General Public",
            "Service Professionals & Practitioners",
            "Sector-Specific Stakeholders",
            "Academia & Researchers",
            "Businesses & Industry",
            "Government & Policymakers",
        ],
        "category": [
            "Health & Wellness",
            "Social Justice & Welfare",
            "Science, Technology & Communications",
        ],
    },
    "Ministry of Heavy Industries": {
        "audience": [
            "Businesses & Industry",
            "Government & Policymakers",
            "Sector-Specific Stakeholders",
        ],
        "category": ["Economy & Finance", "Infrastructure & Urban Development"],
    },
    "Ministry of Home Affairs": {
        "audience": [
            "General Public",
            "Government & Policymakers",
            "Media & Journalists",
            "Civil Society & NGOs",
            "Service Professionals & Practitioners",
        ],
        "category": [
            "Defence & National Security",
            "Governance & Public Administration",
            "Law & Justice",
        ],
    },
    "Ministry of Housing & Urban Affairs": {
        "audience": [
            "General Public",
            "Businesses & Industry",
            "Government & Policymakers",
            "Civil Society & NGOs",
            "Sector-Specific Stakeholders",
        ],
        "category": [
            "Infrastructure & Urban Development",
            "Environment, Climate & Forests",
            "Social Justice & Welfare",
        ],
    },
    "Ministry of Information & Broadcasting": {
        "audience": [
            "Media & Journalists",
            "Businesses & Industry",
            "General Public",
            "Government & Policymakers",
            "Academia & Researchers",
        ],
        "category": [
            "Science, Technology & Communications",
            "Culture, Heritage & Tourism",
            "Governance & Public Administration",
        ],
    },
    "Ministry of Jal Shakti": {
        "audience": [
            "General Public",
            "Sector-Specific Stakeholders",
            "Businesses & Industry",
            "Government & Policymakers",
            "Civil Society & NGOs",
            "Academia & Researchers",
        ],
        "category": [
            "Environment, Climate & Forests",
            "Infrastructure & Urban Development",
            "Agriculture & Rural Development",
            "Health & Wellness",
        ],
    },
    "Ministry of Labour & Employment": {
        "audience": [
            "Sector-Specific Stakeholders",
            "Businesses & Industry",
            "General Public",
            "Government & Policymakers",
            "Civil Society & NGOs",
        ],
        "category": [
            "Social Justice & Welfare",
            "Economy & Finance",
            "Education, Skills & Youth",
        ],
    },
    "Ministry of Law and Justice": {
        "audience": [
            "Legal & Judiciary",
            "Government & Policymakers",
            "General Public",
            "Media & Journalists",
            "Academia & Researchers",
        ],
        "category": ["Law & Justice", "Governance & Public Administration"],
    },
    "Ministry of Micro,Small & Medium Enterprises": {
        "audience": [
            "Businesses & Industry",
            "Sector-Specific Stakeholders",
            "General Public",
            "Government & Policymakers",
        ],
        "category": ["Economy & Finance", "Education, Skills & Youth"],
    },
    "Ministry of Mines": {
        "audience": [
            "Businesses & Industry",
            "Government & Policymakers",
            "Sector-Specific Stakeholders",
            "Academia & Researchers",
        ],
        "category": [
            "Energy & Natural Resources",
            "Economy & Finance",
            "Environment, Climate & Forests",
        ],
    },
    "Ministry of Minority Affairs": {
        "audience": [
            "Sector-Specific Stakeholders",
            "General Public",
            "Civil Society & NGOs",
            "Government & Policymakers",
        ],
        "category": [
            "Social Justice & Welfare",
            "Education, Skills & Youth",
            "Culture, Heritage & Tourism",
        ],
    },
    "Ministry of New and Renewable Energy": {
        "audience": [
            "Businesses & Industry",
            "General Public",
            "Academia & Researchers",
            "Government & Policymakers",
            "International Community",
        ],
        "category": [
            "Energy & Natural Resources",
            "Environment, Climate & Forests",
            "Science, Technology & Communications",
        ],
    },
    "Ministry of Overseas Indian Affairs": {  # (Largely with MEA)
        "audience": [
            "International Community",
            "Sector-Specific Stakeholders",
            "General Public",
        ],
        "category": [
            "Foreign Affairs & International Cooperation",
            "Social Justice & Welfare",
        ],
    },
    "Ministry of Panchayati Raj": {
        "audience": [
            "Government & Policymakers",
            "General Public",
            "Sector-Specific Stakeholders",
            "Civil Society & NGOs",
        ],
        "category": [
            "Governance & Public Administration",
            "Agriculture & Rural Development",
            "Social Justice & Welfare",
        ],
    },
    "Ministry of Parliamentary Affairs": {
        "audience": ["Government & Policymakers", "Media & Journalists"],
        "category": ["Governance & Public Administration", "Law & Justice"],
    },
    "Ministry of Personnel, Public Grievances & Pensions": {
        "audience": [
            "Government & Policymakers",
            "General Public",
            "Sector-Specific Stakeholders",
            "Service Professionals & Practitioners",
        ],
        "category": [
            "Governance & Public Administration",
            "Social Justice & Welfare",
            "Law & Justice",
        ],
    },
    "Ministry of Petroleum & Natural Gas": {
        "audience": [
            "Businesses & Industry",
            "General Public",
            "Government & Policymakers",
            "International Community",
        ],
        "category": ["Energy & Natural Resources", "Economy & Finance"],
    },
    "Ministry of Planning": {  # (Largely NITI Aayog)
        "audience": [
            "Government & Policymakers",
            "Academia & Researchers",
            "Businesses & Industry",
        ],
        "category": ["Governance & Public Administration", "Economy & Finance"],
    },
    "Ministry of Power": {
        "audience": [
            "Businesses & Industry",
            "General Public",
            "Government & Policymakers",
            "Sector-Specific Stakeholders",
        ],
        "category": [
            "Energy & Natural Resources",
            "Economy & Finance",
            "Infrastructure & Urban Development",
        ],
    },
    "Ministry of Railways": {
        "audience": [
            "General Public",
            "Businesses & Industry",
            "Sector-Specific Stakeholders",
            "Government & Policymakers",
        ],
        "category": ["Infrastructure & Urban Development", "Economy & Finance"],
    },
    "Ministry of Road Transport & Highways": {
        "audience": [
            "General Public",
            "Businesses & Industry",
            "Sector-Specific Stakeholders",
            "Government & Policymakers",
        ],
        "category": ["Infrastructure & Urban Development", "Economy & Finance"],
    },
    "Ministry of Rural Development": {
        "audience": [
            "Sector-Specific Stakeholders",
            "General Public",
            "Government & Policymakers",
            "Civil Society & NGOs",
        ],
        "category": [
            "Agriculture & Rural Development",
            "Social Justice & Welfare",
            "Infrastructure & Urban Development",
        ],
    },
    "Ministry of Science & Technology": {
        "audience": [
            "Academia & Researchers",
            "Businesses & Industry",
            "Service Professionals & Practitioners",
            "Government & Policymakers",
            "Students",
        ],
        "category": [
            "Science, Technology & Communications",
            "Education, Skills & Youth",
            "Economy & Finance",
        ],
    },
    "Ministry of Ports, Shipping and Waterways": {
        "audience": [
            "Businesses & Industry",
            "Government & Policymakers",
            "International Community",
            "Sector-Specific Stakeholders",
        ],
        "category": [
            "Infrastructure & Urban Development",
            "Economy & Finance",
            "Foreign Affairs & International Cooperation",
        ],
    },
    "Ministry of Skill Development and Entrepreneurship": {
        "audience": [
            "Sector-Specific Stakeholders",
            "Businesses & Industry",
            "General Public",
            "Academia & Researchers",
            "Service Professionals & Practitioners",
        ],
        "category": [
            "Education, Skills & Youth",
            "Economy & Finance",
            "Social Justice & Welfare",
        ],
    },
    "Ministry of Social Justice & Empowerment": {
        "audience": [
            "Sector-Specific Stakeholders",
            "General Public",
            "Civil Society & NGOs",
            "Government & Policymakers",
            "Legal & Judiciary",
        ],
        "category": [
            "Social Justice & Welfare",
            "Education, Skills & Youth",
            "Health & Wellness",
            "Law & Justice",
        ],
    },
    "Ministry of Statistics & Programme Implementation": {
        "audience": [
            "Government & Policymakers",
            "Academia & Researchers",
            "Businesses & Industry",
            "Media & Journalists",
        ],
        "category": ["Governance & Public Administration", "Economy & Finance"],
    },
    "Ministry of Steel": {
        "audience": [
            "Businesses & Industry",
            "Government & Policymakers",
            "Sector-Specific Stakeholders",
        ],
        "category": [
            "Economy & Finance",
            "Infrastructure & Urban Development",
            "Energy & Natural Resources",
        ],  # Mining link
    },
    "Ministry of Surface Transport": {  # (Split)
        "audience": [
            "General Public",
            "Businesses & Industry",
            "Sector-Specific Stakeholders",
        ],
        "category": ["Infrastructure & Urban Development"],
    },
    "Ministry of Textiles": {
        "audience": [
            "Businesses & Industry",
            "Sector-Specific Stakeholders",
            "General Public",
            "Academia & Researchers",
        ],
        "category": [
            "Economy & Finance",
            "Culture, Heritage & Tourism",
            "Agriculture & Rural Development",
        ],  # Raw materials
    },
    "Ministry of Tourism": {
        "audience": [
            "General Public",
            "Businesses & Industry",
            "International Community",
            "Media & Journalists",
            "Sector-Specific Stakeholders",
        ],
        "category": [
            "Culture, Heritage & Tourism",
            "Economy & Finance",
            "Infrastructure & Urban Development",
        ],
    },
    "Ministry of Tribal Affairs": {
        "audience": [
            "Sector-Specific Stakeholders",
            "General Public",
            "Civil Society & NGOs",
            "Academia & Researchers",
            "Government & Policymakers",
        ],
        "category": [
            "Social Justice & Welfare",
            "Culture, Heritage & Tourism",
            "Environment, Climate & Forests",
            "Education, Skills & Youth",
        ],
    },
    "Ministry of Urban Development": {  # (Largely Housing & Urban Affairs)
        "audience": [
            "General Public",
            "Businesses & Industry",
            "Government & Policymakers",
        ],
        "category": ["Infrastructure & Urban Development"],
    },
    "Ministry of Water Resources, River Development and Ganga Rejuvenation": {  # (under Jal Shakti)
        "audience": [
            "Sector-Specific Stakeholders",
            "General Public",
            "Businesses & Industry",
            "Government & Policymakers",
            "Civil Society & NGOs",
        ],
        "category": [
            "Environment, Climate & Forests",
            "Agriculture & Rural Development",
            "Infrastructure & Urban Development",
        ],
    },
    "Ministry of Women and Child Development": {
        "audience": [
            "Sector-Specific Stakeholders",
            "General Public",
            "Civil Society & NGOs",
            "Service Professionals & Practitioners",
            "Government & Policymakers",
        ],
        "category": [
            "Social Justice & Welfare",
            "Health & Wellness",
            "Education, Skills & Youth",
        ],
    },
    "Ministry of Youth Affairs and Sports": {
        "audience": [
            "Sector-Specific Stakeholders",
            "General Public",
            "Academia & Researchers",
            "Service Professionals & Practitioners",
        ],
        "category": [
            "Education, Skills & Youth",
            "Culture, Heritage & Tourism",
            "Health & Wellness",
        ],
    },
    "NITI Aayog": {
        "audience": [
            "Government & Policymakers",
            "Academia & Researchers",
            "Businesses & Industry",
            "Civil Society & NGOs",
            "Media & Journalists",
        ],
        "category": [
            "Governance & Public Administration",
            "Economy & Finance",
            "Social Justice & Welfare",
            "Science, Technology & Communications",
            "Infrastructure & Urban Development",
        ],  # Broad
    },
    "PM Speech": {
        "audience": [
            "General Public",
            "Media & Journalists",
            "Government & Policymakers",
            "International Community",
        ],
        "category": [
            "Governance & Public Administration"
        ],  # Can be any topic, so general
    },
    "EAC-PM": {
        "audience": [
            "Government & Policymakers",
            "Academia & Researchers",
            "Media & Journalists",
        ],
        "category": ["Economy & Finance", "Governance & Public Administration"],
    },
    "UPSC": {
        "audience": [
            "General Public",
            "Sector-Specific Stakeholders",
            "Academia & Researchers",
            "Government & Policymakers",
        ],
        "category": ["Governance & Public Administration", "Education, Skills & Youth"],
    },
    "Special Service and Features": {
        "audience": ["General Public", "Media & Journalists", "Academia & Researchers"],
        "category": ["Governance & Public Administration"],  # Generic
    },
    "PIB Headquarters": {
        "audience": [
            "Media & Journalists",
            "General Public",
            "Government & Policymakers",
            "Academia & Researchers",
        ],
        "category": [
            "Governance & Public Administration"
        ],  # Source of news, broadly covers all
    },
    "Office of Principal Scientific Advisor to GoI": {
        "audience": [
            "Government & Policymakers",
            "Academia & Researchers",
            "Businesses & Industry",
            "Service Professionals & Practitioners",
        ],
        "category": [
            "Science, Technology & Communications",
            "Governance & Public Administration",
        ],
    },
    "National Financial Reporting Authority": {
        "audience": [
            "Businesses & Industry",
            "Service Professionals & Practitioners",
            "Legal & Judiciary",
            "Government & Policymakers",
        ],
        "category": [
            "Corporate Governance & Regulation",
            "Economy & Finance",
            "Law & Justice",
        ],
    },
    "Competition Commission of India": {
        "audience": [
            "Businesses & Industry",
            "Legal & Judiciary",
            "General Public",
            "Sector-Specific Stakeholders",
            "Government & Policymakers",
        ],
        "category": [
            "Corporate Governance & Regulation",
            "Economy & Finance",
            "Consumer Affairs & Public Distribution",
            "Law & Justice",
        ],
    },
    "IFSC Authority": {
        "audience": [
            "Businesses & Industry",
            "International Community",
            "Government & Policymakers",
            "Service Professionals & Practitioners",
        ],
        "category": [
            "Economy & Finance",
            "Foreign Affairs & International Cooperation",
            "Corporate Governance & Regulation",
        ],
    },
    "National Security Council Secretariat": {
        "audience": [
            "Government & Policymakers",
            "Academia & Researchers",
            "International Community",
        ],
        "category": [
            "Defence & National Security",
            "Foreign Affairs & International Cooperation",
            "Governance & Public Administration",
        ],
    },
    "National Human Rights Commission": {
        "audience": [
            "General Public",
            "Legal & Judiciary",
            "Civil Society & NGOs",
            "Government & Policymakers",
            "Sector-Specific Stakeholders",
        ],
        "category": [
            "Social Justice & Welfare",
            "Law & Justice",
            "Governance & Public Administration",
        ],
    },
    "Lokpal of India": {
        "audience": [
            "General Public",
            "Government & Policymakers",
            "Legal & Judiciary",
            "Civil Society & NGOs",
            "Media & Journalists",
        ],
        "category": [
            "Governance & Public Administration",
            "Law & Justice",
            "Social Justice & Welfare",
        ],  # Anti-corruption
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
