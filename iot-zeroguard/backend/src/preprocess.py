import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder
from typing import Tuple, List

class DataPreprocessor:
    def __init__(self):
        self.scaler = StandardScaler()
        self.categorical_encoders = {}
        # Assuming NSL-KDD subset format for this project
        self.categorical_cols = ['protocol_type', 'service', 'flag']
        self.numerical_cols = [
            'duration', 'src_bytes', 'dst_bytes', 'land', 'wrong_fragment',
            'urgent', 'hot', 'num_failed_logins', 'logged_in',
            'num_compromised', 'root_shell', 'su_attempted', 'num_root',
            'num_file_creations', 'num_shells', 'num_access_files',
            'num_outbound_cmds', 'is_host_login', 'is_guest_login',
            'count', 'srv_count', 'serror_rate', 'srv_serror_rate',
            'rerror_rate', 'srv_rerror_rate', 'same_srv_rate',
            'diff_srv_rate', 'srv_diff_host_rate', 'dst_host_count',
            'dst_host_srv_count', 'dst_host_same_srv_rate',
            'dst_host_diff_srv_rate', 'dst_host_same_src_port_rate',
            'dst_host_srv_diff_host_rate', 'dst_host_serror_rate',
            'dst_host_srv_serror_rate', 'dst_host_rerror_rate',
            'dst_host_srv_rerror_rate'
        ]

    def fit_transform(self, df: pd.DataFrame) -> Tuple[np.ndarray, List[str]]:
        """Fit scaler and encoders on data, and return transformed numeric array."""
        df_processed = df.copy()

        # Handle categoricals
        for col in self.categorical_cols:
            if col in df_processed.columns:
                le = LabelEncoder()
                df_processed[col] = le.fit_transform(df_processed[col].astype(str))
                self.categorical_encoders[col] = le

        # Select available numerical + encoded categorical columns
        available_cols = [col for col in self.numerical_cols + self.categorical_cols if col in df_processed.columns]
        
        # Scale numericals
        num_data = df_processed[available_cols].values
        scaled_data = self.scaler.fit_transform(num_data)
        
        return scaled_data, available_cols

    def transform(self, df: pd.DataFrame) -> Tuple[np.ndarray, List[str]]:
        """Transform new data using fitted scaler and encoders."""
        df_processed = df.copy()
        
        for col in self.categorical_cols:
            if col in df_processed.columns and col in self.categorical_encoders:
                le = self.categorical_encoders[col]
                # Handle unseen labels by mapping them to a default or ignoring
                # In a real system, we'd have robust unseen label handling
                df_processed[col] = df_processed[col].map(
                    lambda s: s if s in le.classes_ else le.classes_[0]
                )
                df_processed[col] = le.transform(df_processed[col].astype(str))

        available_cols = [col for col in self.numerical_cols + self.categorical_cols if col in df_processed.columns]
        num_data = df_processed[available_cols].values
        scaled_data = self.scaler.transform(num_data)
        
        return scaled_data, available_cols
